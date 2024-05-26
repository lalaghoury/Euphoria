import { useEffect, useState } from "react";
import { Modal, message } from "antd";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateWishlistCount } from "../redux/slices/wishlistSlice";

const WishlistButton = ({ wishlists, productId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isInWishlist, setIsInWishlist] = useState(true);
  const [loading, setLoading] = useState(false);
  const auth = useSelector((state) => state.auth);

  const handleNotLoggedIn = () => {
    Modal.info({
      title: "Please login to continue",
      content: "You need to login to add a product to your wishlist",
      onOk() {
        navigate("/sign-in");
      },
    });
  };

  useEffect(() => {
    setIsInWishlist(wishlists.includes(auth?.user?._id));
  }, [auth?.user?._id, productId, wishlists]);

  const toggleWishlist = async () => {
    if (!auth?.user) {
      handleNotLoggedIn();
      return;
    }
    const action = isInWishlist ? "remove-from-wishlist" : "add-to-wishlist";

    try {
      setLoading(true);
      const endpoint = `${"https://euphoria-six.vercel.app/api"}/products/${action}/${productId}`;
      const { data } = await axios.post(endpoint);
      if (data.success) {
        dispatch(updateWishlistCount(data.count));
        message.success(data.message);
        setIsInWishlist(!isInWishlist);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.response.data.message);
      message.error(error.response.data.message, 3);
    }
  };

  const style = {
    color: "#fff",
    fill: isInWishlist ? "#8A33FD" : "#3C4242",
  };

  return (
    <div
      onClick={toggleWishlist}
      className={`flex justify-center items-center rounded-full cursor-pointer bg-white w-8 h-8 absolute top-[27px] right-[21px] ${
        loading && "bouncing-button"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="34"
        height="34"
        viewBox="0 0 34 34"
        className="text-2xl"
        style={style}
      >
        <circle cx="17.1291" cy="16.9112" r="16.1796" fill="white" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.7199 12.7123C15.3451 11.1101 13.0525 10.6791 11.3299 12.1463C9.60735 13.6134 9.36484 16.0664 10.7176 17.8016C11.8423 19.2442 15.246 22.287 16.3616 23.2718C16.4864 23.382 16.5488 23.4371 16.6216 23.4587C16.6851 23.4776 16.7547 23.4776 16.8182 23.4587C16.891 23.4371 16.9534 23.382 17.0782 23.2718C18.1938 22.287 21.5975 19.2442 22.7222 17.8016C24.075 16.0664 23.862 13.598 22.1099 12.1463C20.3577 10.6945 18.0947 11.1101 16.7199 12.7123Z"
          stroke="#3C4242"
          strokeWidth="1.26066"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default WishlistButton;
