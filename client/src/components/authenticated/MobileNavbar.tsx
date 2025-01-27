import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { deletethetoken } from "@/store/slices/UserSlices"
const RightArrowIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
)

const MobileNavbar: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const navigate_to = (key: "/video" | "/updateprofile" | "/") => {
        navigate(key)
    }
    return (
        <div className='bg-black h-[10vh] flex items-center'>
            <Sheet >
                <SheetTrigger>
                    <button
                        className="flex flex-col justify-center items-center w-10 h-8 space-y-1.5 focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        <span className="block w-8 h-0.5 bg-white transform transition-all duration-300" />
                        <span className="block w-8 h-0.5 bg-white transition-opacity duration-300 " />
                        <span className="block w-8 h-0.5 bg-white transform transition-all duration-300 " />
                    </button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px]">
                    <div className='flex flex-col gap-10'>
                        <div className='flex justify-center items-center text-[20px] gap-2' onClick={() => navigate_to("/")}>
                            Home
                            <RightArrowIcon />
                        </div>
                        <div className='flex justify-center items-center text-[20px] gap-2' onClick={() => navigate_to("/video")}>
                            VideoCall
                            <RightArrowIcon />
                        </div>
                        <div className='flex justify-center items-center text-[20px] gap-2' onClick={() => dispatch(deletethetoken())}>
                            Logout
                            <RightArrowIcon />
                        </div>
                        <div className='flex justify-center items-center text-[20px] gap-2' onClick={() => navigate_to("/updateprofile")}>
                            update user
                            <RightArrowIcon />
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default MobileNavbar