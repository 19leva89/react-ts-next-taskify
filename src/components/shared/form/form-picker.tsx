// import Link from 'next/link'
import Image from 'next/image'
import { useFormStatus } from 'react-dom'
import { useEffect, useState } from 'react'
import { CheckIcon, Loader2Icon } from 'lucide-react'

import { cn } from '@/lib'
import { unsplash } from '@/lib/unsplash'
import { defaultImages } from '@/constants/images'

import { FormErrors } from './form-errors'

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
			<div className="p-6 flex items-center justify-center">
				<Loader2Icon className="h-6 w-6 text-sky-700 animate-spin" />
			</div>
		)
	}

	return (
		<div className="relative">
			<div className="grid grid-cols-3 gap-2 mb-2">
				{images.map((image) => (
					<div
						key={image.id}
						className={cn(
							'cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted',
							pending && 'opacity-50 hover:opacity-50 cursor-auto',
						)}
						onClick={() => {
							if (pending) return
							setSelectedImageId(image.id)
						}}
					>
						<input
							id={id}
							name={id}
							type="radio"
							className="hidden"
							checked={selectedImageId === image.id}
							disabled={pending}
							value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
							onChange={() => setSelectedImageId(image.id)}
						/>

						<Image
							fill
							src={image.urls.thumb}
							alt="Unsplash image"
							className="object-cover rounded-sm"
							sizes="20vw"
						/>

						{selectedImageId === image.id && (
							<div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
								<CheckIcon className="h-4 w-4 text-white" />
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

			<FormErrors id="image" errors={errors} />
		</div>
	)
}
