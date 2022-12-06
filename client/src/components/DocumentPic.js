export default function DocumentPic(props) {
  return (
    <img
    loading="lazy"
    className="cursor-pointer h-12 w-12 mt-1.5 rounded-full ml-2"
    alt=""
    src={props.url}
  />
  );
};
