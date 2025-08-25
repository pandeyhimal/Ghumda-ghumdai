import { Button } from "@/components/ui/button";
import { ArrowRight, Mountain, Users, MapPin } from "lucide-react";
import heroImage from "@/assets/nepal-hero.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

export const Hero = () => {
  const { t } = useLanguage();

  const handleScroll = () => {
    const section = document.getElementById("explore-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage}
          alt="Nepal Himalayas"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            {/* {t('hero.title')} */}
                Ghumda <span className="text-secondary">Ghumdai</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-4 font-medium">
            {t('hero.subtitle')}
          </p>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            {t('hero.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
            onClick={handleScroll}
              size="lg" 
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-[var(--shadow-mountain)] hover:shadow-2xl transition-all duration-300"
            >
              <Mountain 
              className="mr-2 h-5 w-5" />
              {t('hero.cta.explore')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
            onClick={() => window.location.href = '/register'}
              size="lg" 
              variant="outline" 
              className="border-2 border-primary-foreground text-primary backdrop-blur-sm"
            >
              <Users className="mr-2 h-5 w-5" />
              {t('hero.cta.community')}
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">500+</div>
              <div className="text-primary-foreground/80">{t('hero.stats.places')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">200+</div>
              <div className="text-primary-foreground/80">{t('hero.stats.foods')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">100+</div>
              <div className="text-primary-foreground/80">{t('hero.stats.traditions')}</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground rounded-full mt-2 animate-pulse"></div>
        </div>
      </div> */}
    </section>
  );
}