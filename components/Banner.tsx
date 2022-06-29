import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../constants/movie'
import { Movie } from '../typings'
import { FaPlay } from 'react-icons/fa'
import { InformationCircleIcon } from '@heroicons/react/solid'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'

interface BannerProps {
	netflixOriginals: Movie[]
}

function Banner({ netflixOriginals }: BannerProps) {
	const [randomMovie, setRandomMovie] = useState<Movie | null>(null)
	const [showModal, setShowModal] = useRecoilState(modalState)
	const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

	useEffect(() => {
		setRandomMovie(
			netflixOriginals[Math.floor(Math.random() * netflixOriginals?.length)]
		)
	}, [netflixOriginals])

	return (
		<div className="flex flex-col space-y-2 pt-[15vh] pb-0 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-0">
			<div className="absolute top-0 left-0 -z-10 h-[95vh] w-full">
				<Image
					src={`${baseUrl}${
						randomMovie?.backdrop_path || randomMovie?.poster_path
					}`}
					layout="fill"
					objectFit="cover"
				/>
			</div>
			<h1 className="mt-[10vh] max-w-[65vw] text-2xl font-bold md:text-5xl lg:text-7xl">
				{randomMovie?.title ||
					randomMovie?.name ||
					randomMovie?.original_name}
			</h1>
			<div className="">
				<p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-xl">
					{randomMovie?.overview}
				</p>
			</div>
			<div className="flex space-x-3">
				<button className="bannerBtn bg-white text-black">
					<FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
					Play
				</button>
				<button
					className="bannerBtn bg-[gray]/70 "
					onClick={() => {
						setCurrentMovie(randomMovie)
						setShowModal(true)
					}}
				>
					More Info{' '}
					<InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
				</button>
			</div>
		</div>
	)
}

export default Banner
