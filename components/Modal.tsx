import React, { useEffect, useState } from "react";
import MuiModal from "@mui/material/Modal";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import { XIcon } from "@heroicons/react/solid";
import { Movie } from "../typings";

const Modal = () => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [data, setData] = useState();
  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json());
    }
    fetchMovie();
  }, [movie]);

  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <MuiModal open={showModal} onClose={handleClose}>
      <div>
        <button
          onClick={handleClose}
          className='modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] flex justify-center items-center hover:bg-[#181818]'
        >
          <XIcon className='h-6 w-6' />
        </button>
        <div></div>
      </div>
    </MuiModal>
  );
};

export default Modal;
