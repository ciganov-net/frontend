'use client'

import { useEffect, useRef, useState } from 'react'

import { useGetMe } from '@/api/hooks/useGetMe'
import { usePatchUser } from '@/api/hooks/usePatchUser'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUploadAvatar } from '@/api/hooks/useUploadAvatar'
import { getCiganovNet } from '@/api/generated/client'

export function Profile() {
  const { data: user, isLoading } = useGetMe()
  const { mutate: patchUser, isPending } = usePatchUser()
  const { mutateAsync: uploadAvatar } = useUploadAvatar()

  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [message, setMessage] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return

    setDisplayName(user.displayName ?? '')
    setBio(user.bio ?? '')

    const loadAvatar = async () => {
      if (!user.avatar) {
        setAvatarUrl(null)
        return
      }

      const res = await getCiganovNet().mediaControllerGetFile(user.avatar)
      setAvatarUrl(res.data.url)
    }

    loadAvatar()
  }, [user])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage('')

    let avatarFileId: string | undefined

    if (file) {
      const res = await uploadAvatar(file)
      avatarFileId = res.fileId
    }

    const payload: any = {
      displayName,
      bio
    }

    if (avatarFileId) {
      payload.avatar = avatarFileId
    }

    try {
      await patchUser(payload)
      setMessage('Профиль сохранен')

      if (avatarFileId) {
        const res = await getCiganovNet().mediaControllerGetFile(avatarFileId)
        setAvatarUrl(res.data.url)
      }
    } catch {
      setMessage('Не удалось сохранить профиль')
    }
  }

  if (isLoading) {
    return (
      <section className='flex w-full flex-col gap-6'>
        <h1 className='typo-h2 text-[var(--neutral-0)]'>Профиль</h1>

        <div className='rounded-[var(--radius-md)] bg-[rgba(17,19,24,0.6)] p-6'>
          <p className='typo-small text-[var(--neutral-400)]'>Загрузка...</p>
        </div>
      </section>
    )
  }

  return (
    <section className='flex w-full flex-col gap-6'>
      <h1 className='typo-h2 text-[var(--neutral-0)]'>Профиль</h1>

      <div className="relative w-24 h-24">
        <div
          className="w-24 h-24 rounded-full overflow-hidden bg-gray-700 cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          {avatarUrl ? (
            <img src={avatarUrl} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-600" />
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) setFile(f)
          }}
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className='flex w-full max-w-[520px] flex-col gap-6 rounded-[var(--radius-md)] bg-[rgba(17,19,24,0.6)] p-6 backdrop-blur'
      >
        <div className='flex flex-col gap-2'>
          <Label className='typo-xsmall text-[var(--neutral-0)]'>
            Отображаемое имя
          </Label>

          <Input
            value={displayName}
            onChange={event => setDisplayName(event.target.value)}
            placeholder='Введите имя'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <Label className='typo-xsmall text-[var(--neutral-0)]'>
            Описание
          </Label>

          <textarea
            value={bio}
            onChange={event => setBio(event.target.value)}
            placeholder='Расскажите о себе'
            rows={5}
            className='min-h-[120px] w-full resize-none rounded-[var(--radius-xs)] border [border-color:var(--textfield-border-default)] bg-[var(--textfield-background-default)] px-4 py-3 typo-small text-[var(--textfield-text-default)] outline-none transition-all placeholder:text-[var(--textfield-label-default)] hover:[border-color:var(--textfield-border-hover)] focus:[border-color:var(--textfield-border-active)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
          />
        </div>

        {message && (
          <p className='typo-xsmall text-[var(--neutral-400)]'>{message}</p>
        )}

        <Button
          type='submit'
          variant='solid'
          color='primary'
          size='large'
          disabled={isPending}
          className='w-full'
        >
          {isPending ? 'Сохранение...' : 'Сохранить'}
        </Button>
      </form>
    </section>
  )
}