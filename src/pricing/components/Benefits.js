const benefits = [
  {
    title: "One low price",
    subtitle: "Save big. Get everything with a super low monthly subscription.",
  },
  {
    title: "No Limits",
    subtitle: "Get complete access to everything on the site.",
  },
  {
    title: "Cancel Anytime",
    subtitle: "Pause or stop your subscription, whenever you want.",
  },
];

export default function Benefits() {
  return (
    <div className="bg-black">
      <div className="column-padding">
        <div className="content-grid xl">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="spacing-base">
              <h3>
                {benefit.title}
                <br />
              </h3>
              <div>{benefit.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
