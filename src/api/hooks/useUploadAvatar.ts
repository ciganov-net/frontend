import { useMutation } from "@tanstack/react-query"
import { getCiganovNet } from "../generated/client"

export const useUploadAvatar = () => {
    return useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData()
            formData.append('file', file)

            const res = await getCiganovNet().mediaControllerUploadAvatar({
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            
            return res.data
        }
    })
}