import React from "react";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Card } from "@/components/ui/card"
import { RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import { Avatar } from "@mui/material"
import { Button } from "@/components/ui/button"
import { deletethetoken } from "@/store/slices/UserSlices"

const Header: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user)
  const dispatch = useDispatch()

  const navigate_to = (key: "/" | "/updateprofile" | "/video") => {
    navigate(key)
  }

  return (
    <div className="bg-black text-slate-200 w-full sticky top-0 h-[10vh]">
      <div className="flex flex-col sm:flex-row sm:justify-around items-center p-4 text-black">
        <div
          className="p-3 rounded-lg font-medium cursor-pointer hover:bg-slate-200  bg-slate-50"
          onClick={() => navigate_to("/")}
        >
          Home
        </div>
        <div
          onClick={() => navigate_to("/video")}
          className="p-3 rounded-lg font-medium cursor-pointer hover:bg-slate-200  bg-slate-50"
        >
          VideoCall
        </div>
        <Popover>
          <PopoverTrigger>
            <div
              className="p-3 rounded-lg font-medium cursor-pointer hover:bg-slate-200  bg-slate-50"
            >
              User
            </div>
          </PopoverTrigger>
          <PopoverContent className="h-[20vh] w-[20vw] p-3">
            <Card >
              <div className="flex justify-center mb-2">
                {
                  user.PhotoUrl ? <Avatar src={user.PhotoUrl} alt="User Profile" /> : <>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkr94Z9oGA_KuzX9ghnsctIEudavAJJht_VUyCDUw6c8eBeijX1Hg1RA6ckmWhBVNUlx4&usqp=CAU" className="w-10 h-10 rounded-lg" /></>
                }

              </div>
              <p className="text-center mb-2">{user.Name}</p>
              <div className="flex justify-around items-center mb-4">
                <Button onClick={() => navigate_to("/updateprofile")}>update</Button>
                <Button onClick={() => dispatch(deletethetoken())}>logout</Button>
              </div>
            </Card>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Header;
