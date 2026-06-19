import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PatchUserRequest } from '../generated'
import { getCiganovNet } from '../generated/client'

export const usePatchUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dto: PatchUserRequest) =>
      getCiganovNet()
        .usersControllerPatchUser(dto)
        .then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get me']
      })
    }
  })
}