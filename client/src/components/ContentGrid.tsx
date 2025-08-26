import { ContentCard } from "@/components/ContentCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { useContent } from "@/contexts/ContentContext";

export const ContentGrid = () => {
  const { t } = useLanguage();
  const { filteredContent } = useContent();
  
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('content.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('content.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.length > 0 ? (
            filteredContent.map((item) => (
              <ContentCard key={item.id} {...item} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-muted-foreground">No content found matching your search criteria.</p>
              <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            {t('content.description')}
          </p>
          <button className="text-primary hover:text-primary-glow font-medium underline underline-offset-4 hover:no-underline transition-all">
            {t('content.button')} →
          </button>
        </div>
      </div>
    </section>
  );
};