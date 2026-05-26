'use client'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import {useRef, useState} from "react";

export interface Slide {
    id: number;
    title: string;
    image: string;
    link: string;
    description: string;
    thumbnail?: string;
}

interface HeroCarouselProps {
    slides: Slide[];
}

const HeroCarousel = ({slides}: HeroCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef<CarouselApi | null>(null);
    return (
        <Carousel
            plugins={[
                Autoplay({
                    delay: 3000,
                }),
            ]}
            opts={{loop: true}}
            className={'relative'}
            setApi={(api: CarouselApi) => {
                if (api) {
                    api.on('select', () => {
                        setCurrentIndex(api.selectedScrollSnap());
                    });
                    carouselRef.current = api;
                }
            }}
        >
            <CarouselContent>
                {
                    slides.map((slide) => (
                        <CarouselItem key={slide.id}>
                            <a href={slide.link} target="_blank">
                                <img src={slide.thumbnail} alt={slide.title} className="w-full h-[40vw] object-cover"/>
                            </a>
                        </CarouselItem>
                    ))
                }
            </CarouselContent>
            <div className={'absolute bottom-4 left-0 right-0 z-10'}>
                <div className={'w-full flex justify-center gap-x-2'}>
                    {
                        slides.map((slide, index) => (
                            <div
                                key={slide.id}
                                onClick={() => {
                                    carouselRef.current?.scrollTo(index);
                                }}
                                className={`w-10 h-5 rounded-full opacity-50 cursor-pointer ${currentIndex === index ? 'bg-red-400/80' : 'bg-white'}`}></div>
                        ))
                    }
                </div>
            </div>
        </Carousel>
    );
};

export default HeroCarousel;