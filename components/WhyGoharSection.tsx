import { ArrowUpRight, ChartNoAxesCombined, Cog, Gem, Leaf, UsersRound } from "lucide-react";

const values = [
  {title:"کیفیت پایدار",description:"توجه به کیفیت محصول و استانداردهای تولید",Icon:Gem},
  {title:"توسعه مسئولانه",description:"نگاه بلندمدت به محیط‌زیست و جامعه",Icon:Leaf},
  {title:"سرمایه انسانی توانمند",description:"اتکا به تخصص، دانش و تجربه نیروها",Icon:UsersRound},
  {title:"فناوری و نوآوری",description:"بهبود مستمر فرایندها و راهکارهای صنعتی",Icon:Cog},
  {title:"ارزش‌آفرینی بلندمدت",description:"تلاش برای توسعه زنجیره فولاد کشور",Icon:ChartNoAxesCombined},
];

export function WhyGoharSection() {
  return (
    <section className="why-gohar-section" id="why-gohar" aria-labelledby="why-gohar-title">
      <div className="end-sections-container">
        <div className="end-section-heading end-section-heading--compact">
          <div className="end-section-heading__main">
            <span className="end-section-heading__number" aria-hidden="true">06</span>
            <h2 id="why-gohar-title">چرا گهرزمین؟</h2>
          </div>
          <a href="/about" className="why-gohar-section__more" aria-label="اطلاعات بیشتر درباره فولاد گهرزمین"><ArrowUpRight size={17}/></a>
        </div>
        <div className="why-gohar-section__grid">
          {values.map(({title,description,Icon})=>(
            <div className="why-gohar-item" key={title}>
              <Icon className="why-gohar-item__icon" size={32} strokeWidth={1.5} aria-hidden="true"/>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
