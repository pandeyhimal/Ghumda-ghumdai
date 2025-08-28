import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mountain, Users, MapPin, Heart, Target, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Footer } from '@/components/Footer';

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      
      <main className="pt-20 pb-12">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/20 via-background to-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Mountain className="h-12 w-12 text-primary" />
              <div>
                <h1 className="text-4xl md:text-5xl font-bold">Ghumda Ghumdai</h1>
                <p className="text-xl text-muted-foreground">Travel Together, Discover More</p>
              </div>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We're passionate about showcasing the hidden treasures of Nepal through authentic local experiences. 
              Our platform connects travelers with the heart and soul of Nepali culture.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4">
          {/* Mission Section */}
          <section className="py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <Target className="h-8 w-8 text-primary" />
                  <h2 className="text-3xl font-bold">Our Mission</h2>
                </div>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  To promote sustainable tourism in Nepal by highlighting hidden places, traditional foods, 
                  and cultural traditions that showcase the authentic beauty of our country. We believe that 
                  tourism should benefit local communities while preserving our rich heritage.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Through our platform, we aim to create meaningful connections between travelers and locals, 
                  fostering cultural exchange and economic opportunities in rural and urban areas alike.
                </p>
              </div>
              <Card className="shadow-[var(--shadow-card)]">
                <CardContent className="p-8">
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">500+</div>
                      <div className="text-sm text-muted-foreground">Hidden Places</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-secondary mb-2">200+</div>
                      <div className="text-sm text-muted-foreground">Local Foods</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-accent mb-2">100+</div>
                      <div className="text-sm text-muted-foreground">Traditions</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">1000+</div>
                      <div className="text-sm text-muted-foreground">Travelers</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16">
            <h2 className="text-3xl font-bold text-center mb-12">What Makes Us Special</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-mountain)] transition-all duration-300">
                <CardContent className="p-6">
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Local Insights</h3>
                  <p className="text-muted-foreground">
                    Discover hidden gems recommended by locals who know Nepal best. 
                    Get authentic experiences beyond tourist hotspots.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-mountain)] transition-all duration-300">
                <CardContent className="p-6">
                  <Users className="h-12 w-12 text-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Community Driven</h3>
                  <p className="text-muted-foreground">
                    Our content is curated by a passionate community of travelers, 
                    locals, and culture enthusiasts who love Nepal.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-mountain)] transition-all duration-300">
                <CardContent className="p-6">
                  <Heart className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Sustainable Tourism</h3>
                  <p className="text-muted-foreground">
                    We promote responsible tourism that supports local communities 
                    and preserves Nepal's natural and cultural heritage.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Star className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Authenticity</h3>
                    <p className="text-muted-foreground">
                      We showcase genuine experiences that reflect the true spirit of Nepal, 
                      avoiding commercialized or inauthentic attractions.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Star className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Community First</h3>
                    <p className="text-muted-foreground">
                      Local communities are at the heart of everything we do. 
                      We ensure tourism benefits reach the people who preserve our culture.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Star className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Cultural Preservation</h3>
                    <p className="text-muted-foreground">
                      We're committed to documenting and preserving Nepal's rich traditions 
                      for future generations through storytelling and education.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Star className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Sustainability</h3>
                    <p className="text-muted-foreground">
                      Environmental and cultural sustainability guide our recommendations, 
                      ensuring tourism doesn't harm what makes Nepal special.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Star className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Quality Over Quantity</h3>
                    <p className="text-muted-foreground">
                      We carefully curate each recommendation to ensure visitors have 
                      meaningful, high-quality experiences rather than just checking boxes.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Star className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Inclusivity</h3>
                    <p className="text-muted-foreground">
                      Nepal's diversity is our strength. We celebrate all communities, 
                      traditions, and perspectives that make up our beautiful country.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 text-center">
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 shadow-[var(--shadow-card)]">
              <CardContent className="p-12">
                <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Be part of a community that celebrates Nepal's incredible diversity. 
                  Share your experiences, discover new places, and help fellow travelers 
                  create unforgettable memories.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/register">
                    <Button size="lg" className="bg-gradient-to-r from-primary to-primary-glow">
                      Get Started Today
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button variant="outline" size="lg">
                      Explore Content
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      {/* <Footer /> */}
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
}