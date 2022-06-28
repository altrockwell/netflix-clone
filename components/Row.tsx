import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import React, { useEffect, useRef, useState } from 'react'
import { Movie } from '../typings'
import Thumbnail from './Thumbnail'

interface Props {
	title: string
	movies: Movie[]
}

function Row({ title, movies }: Props) {
	const rowRef = useRef<HTMLDivElement>(null)
	const firstRowRef = useRef<HTMLDivElement>(null)
	const lastRowRef = useRef<HTMLDivElement>(null)
	const [isMoved, setIsMoved] = useState(false)
	const [isLast, setIsLast] = useState(false)

	const handleClick = (direction: string) => {
		setIsMoved(true)
		if (rowRef.current) {
			const { scrollLeft, clientWidth } = rowRef.current

			const scrollTo =
				direction === 'left'
					? scrollLeft - clientWidth
					: scrollLeft + clientWidth
			rowRef.current.scrollTo({
				left: scrollTo,
				behavior: 'smooth',
			})
		}
	}
	useEffect(() => {
		const observer = new window.IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) setIsLast(true)
					else setIsLast(false)
				})
			},
			{ threshold: 1 }
		)
		if (lastRowRef.current) {
			observer.observe(lastRowRef.current)
		}
		return () => {
			if (lastRowRef.current) {
				observer.observe(lastRowRef.current)
			}
		}
	}, [])
	useEffect(() => {
		const observer = new window.IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) setIsMoved(false)
					else setIsMoved(true)
				})
			},
			{ threshold: 1 }
		)
		if (firstRowRef.current) {
			observer.observe(firstRowRef.current)
		}
		return () => {
			if (firstRowRef.current) {
				observer.observe(firstRowRef.current)
			}
		}
	}, [])
	return (
		<div className="h-40 space-y-0.5 ">
			<h2 className="w-56 cursor-pointer text-sm font-semibold  text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
				{title}
			</h2>
			<div className="group relative md:-ml-2">
				<ChevronLeftIcon
					className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer 
                opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
							!isMoved && 'hidden'
						}`}
					onClick={() => handleClick('left')}
				/>
				<div
					ref={rowRef}
					className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2"
				>
					{movies.map((movie, i) => (
						<div
							ref={
								(i === 0 && firstRowRef) ||
								(i === movies.length - 1 && lastRowRef) ||
								null
							}
							key={movie.id}
						>
							<Thumbnail movie={movie} />
						</div>
					))}
				</div>
				<ChevronRightIcon
					className={`absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer 
                opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
							isLast && 'hidden'
						}`}
					onClick={() => handleClick('rights')}
				/>
			</div>
		</div>
	)
}

export default Row
