// import Link from 'next/link'
import Image from 'next/image'
import { useFormStatus } from 'react-dom'
import { useEffect, useState } from 'react'
import { CheckIcon, Loader2Icon } from 'lucide-react'

import { cn } from '@/lib'
import { unsplash } from '@/lib/unsplash'
import { defaultImages } from '@/constants/images'
import { FormErrors } from '@/components/shared/form/form-errors'

interface UnsplashImage {
	id: string
	urls: {
		thumb: string
		full: string
	}
	links: {
		html: string
	}
	user: {
		name: string
	}
}

interface Props {
	id: string
	errors?: Record<string, string[] | undefined>
}

export const FormPicker = ({ id, errors }: Props) => {
	const { pending } = useFormStatus()

	const [images, setImages] = useState<Array<UnsplashImage>>(defaultImages)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [selectedImageId, setSelectedImageId] = useState<string | null>(null)

	useEffect(() => {
		const fetchImages = async () => {
			try {
				const result = await unsplash.photos.getRandom({
					collectionIds: ['317099'],
					count: 9,
				})

				if (result && result.response) {
					const newImages = result.response as Array<UnsplashImage>
					setImages(newImages)
				} else {
					console.error('Failed to get images from Unsplash')
				}
			} catch (error) {
				console.log(error)
				setImages(defaultImages)
			} finally {
				setIsLoading(false)
			}
		}

		fetchImages()
	}, [])

	if (isLoading) {
		return (
			<div className='flex items-center justify-center p-6'>
				<Loader2Icon className='size-6 animate-spin text-sky-700' />
			</div>
		)
	}

	return (
		<div className='relative'>
			<div className='mb-2 grid grid-cols-3 gap-2'>
				{images.map((image) => (
					<div
						key={image.id}
						className={cn(
							'group relative aspect-video cursor-pointer bg-muted transition hover:opacity-75',
							pending && 'cursor-auto opacity-50 hover:opacity-50',
						)}
						onClick={() => {
							if (pending) return
							setSelectedImageId(image.id)
						}}
					>
						<input
							id={id}
							name={id}
							type='radio'
							className='hidden'
							checked={selectedImageId === image.id}
							disabled={pending}
							value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
							onChange={() => setSelectedImageId(image.id)}
						/>

						<Image
							fill
							src={image.urls.thumb}
							alt='Unsplash image'
							className='rounded-sm object-cover'
							sizes='20vw'
						/>

						{selectedImageId === image.id && (
							<div className='absolute inset-y-0 flex size-full items-center justify-center bg-black/30'>
								<CheckIcon className='size-4 text-white' />
							</div>
						)}

						{/* <Link
							href={image.links.html}
							target="_blank"
							className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
						>
							{image.user.name}
						</Link> */}
					</div>
				))}
			</div>

			<FormErrors id='image' errors={errors} />
		</div>
	)
}
