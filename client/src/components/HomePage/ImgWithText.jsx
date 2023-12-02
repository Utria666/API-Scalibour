import Button from "../common/Button";

function TextWithImgLeft({
  titleText,
  titleColor,
  descriptionText,
  descriptionColor,
  buttonText,
  buttonStyle,
  imgSrc,
  imgAlt,
}) {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          alt={imgAlt}
          className="w-full h-auto object-cover"
          height="300"
          src={imgSrc}
          style={{
            aspectRatio: "555/300",
            objectFit: "cover",
          }}
          width="555"
        />
        <div>
          <h3 className={`text-xl font-semibold mb-4 text-${titleColor}`}>
            {titleText}
          </h3>
          <p className={`mb-6 text-${descriptionColor}`}>{descriptionText}</p>
          <Button texto={buttonText} className={buttonStyle} />
        </div>
      </div>
    </div>
  );
}

function TextWithImgRight({
  backgroundColor,
  titleText,
  titleColor,
  descriptionText,
  descriptionColor,
  buttonText,
  buttonStyle,
  imgSrc,
  imgAlt,
}) {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className={`text-xl font-semibold mb-4 text-${titleColor}`}>
            {titleText}
          </h3>
          <p className={`mb-6 text-${descriptionColor}`}>{descriptionText}</p>
          <Button texto={buttonText} className={buttonStyle} />
        </div>
        <img
          alt={imgAlt}
          className="w-full h-auto object-cover"
          height="300"
          src={imgSrc}
          style={{
            aspectRatio: "555/300",
            objectFit: "cover",
          }}
          width="555"
        />
      </div>
    </div>
  );
}

export { TextWithImgLeft, TextWithImgRight };
