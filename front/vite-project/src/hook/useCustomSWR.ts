import useSWR from "swr";

function token(){
    const t = localStorage.getItem("token")
    return t ? "bearer " + t : ""
}

class UnauthenticatedError extends Error {}

export const fetcher = function <T = any>(...a: Parameters<typeof fetch>) { 
    return fetch(
        import.meta.env.VITE_API_URL! + a[0], {
            ...(a[1] || {}),
            headers: {
                ...(a[1]?.headers || {}),
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": token()
            }
        }
    )
        .then((r) => {
            if(r.status == 401) throw new UnauthenticatedError()
            return r
        })
        .then(r => r.json() as T)
        .catch(e => {
            if(e instanceof UnauthenticatedError) {
                localStorage.removeItem("token")
                window.location.pathname = "/login"
            }
        }) as Promise<T>
}

export default function useCustomSWR<T>(path: string) { return useSWR<T>(path, (...a: Parameters<typeof fetch>) => fetcher(...a)) }