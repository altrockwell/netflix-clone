import React, { useEffect, useState } from 'react'
import MuiModal from '@mui/material/Modal'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { XIcon } from '@heroicons/react/solid'
import { Element, Genre } from '../typings'
import ReactPlayer from 'react-player/youtube'

function Modal() {
	const [showModal, setShowModal] = useRecoilState(modalState)
	const [currentMovie] = useRecoilState(movieState)
	const [trailer, setTrailer] = useState('')
	const [genres, setGenres] = useState<Genre[]>([])
	const [muted, setMuted] = useState(true)

	const handleClose = () => {
		setShowModal(false)
	}

	useEffect(() => {
		if (!currentMovie) return
		async function fetchMovie() {
			const data = await fetch(
				`https://api.themoviedb.org/3/${
					currentMovie?.media_type === 'tv' ? 'tv' : 'movie'
				}/${currentMovie?.id}?api_key=${
					process.env.NEXT_PUBLIC_API_KEY
				}&language=en-US&append_to_response=videos`
			).then((response) => response.json())
			if (data?.videos) {
				const index = data.videos.results.findIndex(
					(element: Element) => element.type === 'Trailer'
				)
				setTrailer(data.videos?.results[index]?.key)
			}
			if (data?.genres) {
				setGenres(data.genres)
			}
		}
		fetchMovie()
	}, [])

	return (
		<MuiModal
			open={showModal}
			onClose={handleClose}
			className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
		>
			<>
				<button
					onClick={handleClose}
					className="modalBtn absolute right-5 !z-40 border-none 
                bg-[#181818] hover:bg-[#181818]"
				>
					<XIcon className="h-6 w-6" />
				</button>

				<div className="relative pt-[56.25%]">
					<ReactPlayer
						url={`https://www.youtube.com/watch?v=${trailer}`}
						width="100%"
						height="100%"
						style={{ position: 'absolute', top: '0', left: '0' }}
						playing
						muted={muted}
					/>
				</div>
			</>
		</MuiModal>
	)
}

export default Modal
