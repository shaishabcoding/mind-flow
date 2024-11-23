import { FaPlayCircle } from "react-icons/fa";
export default function MediaIntegration() {
  return (
    <div className="relative">
      <iframe
        src="https://www.instagram.com/reel/CxDJCvVPxC7/embed"
        width="400"
        height="480"
        frameBorder="0"
        scrolling="no"
        allowTransparency="true"
        className="-mt-14"
      ></iframe>
      <FaPlayCircle className="absolute top-1/2 left-1/2 text-3xl -translate-x-1/2 translate-y-1/2" />
    </div>
  );
}
