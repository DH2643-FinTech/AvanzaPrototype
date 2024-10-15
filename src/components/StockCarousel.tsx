// @/src/components/StockCarousel.tsx
import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/src/components/shadcn/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/shadcn/card"
import { useAppSelector } from "@/src/lib/hooks/useAppSelector"
import { selectHighlightedStocks } from "@/src/lib/features/highlightedStocks/highlightedStocksSlice"

const StockCarousel = () => {
    const highlightedStocks = useAppSelector(selectHighlightedStocks)
    const companyData = useAppSelector((state) => state.company.companyData);

    const [carouselIndex, setCarouselIndex] = useState(0)

    const nextSlide = () => {
        setCarouselIndex((prevIndex) => (prevIndex + 1) % (highlightedStocks.length - 2))
    }

    const prevSlide = () => {
        setCarouselIndex((prevIndex) => (prevIndex - 1 + highlightedStocks.length - 2) % (highlightedStocks.length - 2))
    }

    return (
        <div className="relative">
            <AnimatePresence initial={false}>
                <div className="flex space-x-4 overflow-hidden">
                    {companyData?.companyEvents?.events.slice(carouselIndex, carouselIndex + 3).map((event:any) => (
                        <motion.div
                            key={"cl" + carouselIndex}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                            className="w-1/3 flex-shrink-0"
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle>{event.type}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">${
                                    //stock.price.toFixed(2)
                                    event.type
                                        }</div>
                                    <div className={`text-sm ${event?.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        {event.change >= 0 ? '+' : ''}{
                                        //event.change.toFixed(2)
                                        event?.date
                                        }
                                        {/* % */}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </AnimatePresence>
            <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4"
                onClick={prevSlide}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4"
                onClick={nextSlide}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    )
}

export default StockCarousel