import { Hero } from "@/components/Hero";
import { SearchFilters } from "@/components/SearchFilters";
import { ContentGrid } from "@/components/ContentGrid";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mountain } from "lucide-react";

const Index = () => {
  const { t } = useLanguage();
  const handleSearch = (filters: unknown) => {
    console.log("Search filters:", filters);
  };

  return (
    <div className="min-h-screen">
    
      <Hero />
      
      {/* Search Section */}
      <section className="py-16 -mt-20 relative z-10">
        <div className="container mx-auto px-4">
          <SearchFilters onSearch={handleSearch} />
        </div>
      </section>
      
      {/* Explore Section */}
      <section id="explore-section" className="scroll-mt-20">
        <ContentGrid />
      </section>
      
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 flex items-center justify-center">
              {/* <span className="text-primary font-bold text-sm">G</span> */}
                        <Mountain className="h-8 w-8 text-white" />
            </div>

            <h3 className="text-xl font-bold">Ghumda <span className="text-secondary">Ghumdai</span> </h3>
          </div>
          <p className="text-primary-foreground/80 mb-4">
            {t('footer.description')}
          </p>
          <p className="text-primary-foreground/60 text-sm">© 2024 Ghumda <span className="text-secondary">Ghumdai</span>. Made By <span className="font-semibold">Team Sanothimi</span>  for Nepal tourism.
            {/* {t('footer.copyright')} */}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
