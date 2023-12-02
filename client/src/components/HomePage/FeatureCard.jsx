import Button from "../common/Button";

function FeatureCard({
  title,
  titleC = "text-gray-800",
  subtitle,
  subtitleC = "text-gray-900",
  description,
  descriptionC = "text-gray-600",
  buttonText,
  buttonStyle,
}) {
  return (
    <div className="mb-8 ">
      <h3 className={`text-lg font-semibold ${titleC} mb-2`}>{title}</h3>
      <h4 className={`text-3xl font-bold ${subtitleC} mb-4`}>{subtitle}</h4>
      <p className={`${descriptionC} mb-6`}>{description}</p>
      <Button texto={buttonText} className={buttonStyle} />
    </div>
  );
}

export default FeatureCard;
