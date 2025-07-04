import React, { useState, useEffect } from 'react';
import { Search, Film, Heart, Eye, Sun, Moon, Star, Plus, Check, X, Play, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  backdrop_path?: string;
  runtime?: number;
}

interface MovieDetails extends Movie {
  genres: { id: number; name: string; }[];
  runtime: number;
  production_companies: { name: string; }[];
  spoken_languages: { english_name: string; }[];
}

interface VideoResult {
  key: string;
  name: string;
  type: string;
  site: string;
}

const TMDB_API_KEY = '42a407a31ab21dca87db67cb353fefe4';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280';

const Index = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [watchList, setWatchList] = useState<Movie[]>([]);
  const [watchedList, setWatchedList] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState('search');
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [movieVideos, setMovieVideos] = useState<VideoResult[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load saved lists from localStorage
    const savedWatchList = localStorage.getItem('tmdb-watchlist');
    const savedWatchedList = localStorage.getItem('tmdb-watched');
    
    if (savedWatchList) {
      setWatchList(JSON.parse(savedWatchList));
    }
    if (savedWatchedList) {
      setWatchedList(JSON.parse(savedWatchedList));
    }

    // Load popular movies on initial load
    fetchPopularMovies();
  }, []);

  useEffect(() => {
    // Generate suggestions when watched list changes
    if (watchedList.length > 0) {
      generateSuggestions();
    }
  }, [watchedList]);

  useEffect(() => {
    // Apply dark mode
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const fetchPopularMovies = async () => {
    if (!TMDB_API_KEY) {
      toast({
        title: "API Key Required",
        description: "Please add your TMDB API key to use this feature.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`);
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      toast({
        title: "Error",
        description: "Failed to fetch popular movies.",
        variant: "destructive"
      });
    }
    setLoading(false);
  };

  const searchMovies = async () => {
    if (!TMDB_API_KEY) {
      toast({
        title: "API Key Required",
        description: "Please add your TMDB API key to use this feature.",
        variant: "destructive"
      });
      return;
    }

    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error('Error searching movies:', error);
      toast({
        title: "Error",
        description: "Failed to search movies.",
        variant: "destructive"
      });
    }
    setLoading(false);
  };

  const generateSuggestions = async () => {
    if (!TMDB_API_KEY || watchedList.length === 0) return;

    try {
      // Get genres from watched movies
      const genreIds = [...new Set(watchedList.flatMap(movie => movie.genre_ids))];
      const randomGenre = genreIds[Math.floor(Math.random() * genreIds.length)];

      const response = await fetch(
        `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${randomGenre}&sort_by=vote_average.desc&vote_count.gte=100`
      );
      const data = await response.json();
      setSuggestions(data.results?.slice(0, 8) || []);
    } catch (error) {
      console.error('Error generating suggestions:', error);
    }
  };

  const fetchMovieDetails = async (movieId: number) => {
    setLoadingDetails(true);
    try {
      // Fetch movie details
      const detailsResponse = await fetch(
        `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`
      );
      const movieDetails = await detailsResponse.json();

      // Fetch movie videos (trailers)
      const videosResponse = await fetch(
        `${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`
      );
      const videosData = await videosResponse.json();
      
      // Filter for trailers from YouTube
      const trailers = videosData.results?.filter(
        (video: VideoResult) => video.type === 'Trailer' && video.site === 'YouTube'
      ) || [];

      setSelectedMovie(movieDetails);
      setMovieVideos(trailers);
      setIsDialogOpen(true);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      toast({
        title: "Error",
        description: "Failed to fetch movie details.",
        variant: "destructive"
      });
    }
    setLoadingDetails(false);
  };

  const addToWatchList = (movie: Movie) => {
    if (watchList.find(m => m.id === movie.id)) {
      toast({
        title: "Already in Watchlist",
        description: "This movie is already in your watchlist.",
      });
      return;
    }

    const newWatchList = [...watchList, movie];
    setWatchList(newWatchList);
    localStorage.setItem('tmdb-watchlist', JSON.stringify(newWatchList));
    
    toast({
      title: "Added to Watchlist",
      description: `${movie.title} has been added to your watchlist.`,
    });
  };

  const removeFromWatchList = (movieId: number) => {
    const newWatchList = watchList.filter(m => m.id !== movieId);
    setWatchList(newWatchList);
    localStorage.setItem('tmdb-watchlist', JSON.stringify(newWatchList));
    
    toast({
      title: "Removed from Watchlist",
      description: "Movie has been removed from your watchlist.",
    });
  };

  const addToWatchedList = (movie: Movie) => {
    if (watchedList.find(m => m.id === movie.id)) {
      toast({
        title: "Already Watched",
        description: "This movie is already in your watched list.",
      });
      return;
    }

    const newWatchedList = [...watchedList, movie];
    setWatchedList(newWatchedList);
    localStorage.setItem('tmdb-watched', JSON.stringify(newWatchedList));
    
    // Remove from watchlist if it's there
    const newWatchList = watchList.filter(m => m.id !== movie.id);
    setWatchList(newWatchList);
    localStorage.setItem('tmdb-watchlist', JSON.stringify(newWatchList));
    
    toast({
      title: "Marked as Watched",
      description: `${movie.title} has been added to your watched list.`,
    });
  };

  const removeFromWatchedList = (movieId: number) => {
    const newWatchedList = watchedList.filter(m => m.id !== movieId);
    setWatchedList(newWatchedList);
    localStorage.setItem('tmdb-watched', JSON.stringify(newWatchedList));
    
    toast({
      title: "Removed from Watched",
      description: "Movie has been removed from your watched list.",
    });
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const MovieCard = ({ movie }: { movie: Movie }) => {
    const isInWatchList = watchList.find(m => m.id === movie.id);
    const isWatched = watchedList.find(m => m.id === movie.id);

    return (
      <Card className="group hover:scale-105 transition-all duration-300 bg-card border-border overflow-hidden cursor-pointer">
        <div className="relative" onClick={() => fetchMovieDetails(movie.id)}>
          <img
            src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : '/placeholder.svg'}
            alt={movie.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex gap-2">
              {!isWatched && (
                <Button
                  size="sm"
                  variant={isInWatchList ? "secondary" : "default"}
                  onClick={(e) => {
                    e.stopPropagation();
                    isInWatchList ? removeFromWatchList(movie.id) : addToWatchList(movie);
                  }}
                  className="backdrop-blur-sm"
                >
                  {isInWatchList ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </Button>
              )}
              <Button
                size="sm"
                variant={isWatched ? "secondary" : "default"}
                onClick={(e) => {
                  e.stopPropagation();
                  isWatched ? removeFromWatchedList(movie.id) : addToWatchedList(movie);
                }}
                className="backdrop-blur-sm"
              >
                {isWatched ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-sm mb-2 line-clamp-2">{movie.title}</h3>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{movie.release_date?.split('-')[0] || 'N/A'}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{movie.vote_average?.toFixed(1) || 'N/A'}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'watchlist':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">My Watchlist ({watchList.length})</h2>
            {watchList.length === 0 ? (
              <div className="text-center py-12">
                <Film className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Your watchlist is empty. Add some movies!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {watchList.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            )}
            
            <h2 className="text-2xl font-bold mt-12 mb-6">Watched ({watchedList.length})</h2>
            {watchedList.length === 0 ? (
              <div className="text-center py-12">
                <Eye className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No movies watched yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {watchedList.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            )}
          </div>
        );
      
      case 'suggestions':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Suggestions for You</h2>
            {suggestions.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  {watchedList.length === 0 
                    ? "Watch some movies first to get personalized suggestions!" 
                    : "Loading suggestions..."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {suggestions.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            )}
          </div>
        );
      
      default:
        return (
          <div>
            <div className="mb-8">
              <div className="flex gap-2 max-w-md mx-auto">
                <Input
                  placeholder="Search for movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchMovies()}
                  className="flex-1"
                />
                <Button onClick={searchMovies} disabled={loading}>
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading movies...</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-6">
                  {searchQuery ? `Search Results for "${searchQuery}"` : 'Popular Movies'}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              </>
            )}
          </div>
        );
    }
  };

  if (!TMDB_API_KEY) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <Film className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h1 className="text-2xl font-bold mb-4">Movie Watchlist App</h1>
            <p className="text-muted-foreground mb-6">
              To use this app, you need to add your TMDB API key. 
              Get one from <a href="https://www.themoviedb.org/settings/api" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">themoviedb.org</a>.
            </p>
            <p className="text-sm text-muted-foreground">
              Add your API key to the TMDB_API_KEY constant in the code.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gradient-to-br from-background via-background to-accent/20 min-h-screen">
        {/* Header */}
        <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Film className="w-8 h-8 text-primary" />
                <h1 className="text-2xl font-bold">MovieList</h1>
              </div>
              
              <nav className="hidden md:flex items-center gap-6">
                <Button
                  variant={currentPage === 'search' ? 'default' : 'ghost'}
                  onClick={() => setCurrentPage('search')}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
                <Button
                  variant={currentPage === 'watchlist' ? 'default' : 'ghost'}
                  onClick={() => setCurrentPage('watchlist')}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  My Lists
                </Button>
                <Button
                  variant={currentPage === 'suggestions' ? 'default' : 'ghost'}
                  onClick={() => setCurrentPage('suggestions')}
                >
                  <Star className="w-4 h-4 mr-2" />
                  Suggestions
                </Button>
              </nav>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </div>

            {/* Mobile Navigation */}
            <nav className="md:hidden flex items-center gap-2 mt-4">
              <Button
                variant={currentPage === 'search' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentPage('search')}
              >
                <Search className="w-4 h-4" />
              </Button>
              <Button
                variant={currentPage === 'watchlist' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentPage('watchlist')}
              >
                <Heart className="w-4 h-4" />
              </Button>
              <Button
                variant={currentPage === 'suggestions' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentPage('suggestions')}
              >
                <Star className="w-4 h-4" />
              </Button>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {renderContent()}
        </main>

        {/* Movie Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {loadingDetails ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : selectedMovie ? (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">{selectedMovie.title}</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* Movie backdrop and poster */}
                  <div className="relative">
                    {selectedMovie.backdrop_path && (
                      <img
                        src={`${BACKDROP_BASE_URL}${selectedMovie.backdrop_path}`}
                        alt={selectedMovie.title}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    )}
                    <div className="absolute -bottom-16 left-4 hidden md:block">
                      <img
                        src={selectedMovie.poster_path ? `${IMAGE_BASE_URL}${selectedMovie.poster_path}` : '/placeholder.svg'}
                        alt={selectedMovie.title}
                        className="w-32 h-48 object-cover rounded-lg border-4 border-background shadow-lg"
                      />
                    </div>
                  </div>

                  {/* Movie details */}
                  <div className="md:ml-40 space-y-4">
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      {selectedMovie.release_date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(selectedMovie.release_date).getFullYear()}</span>
                        </div>
                      )}
                      {selectedMovie.runtime && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{formatRuntime(selectedMovie.runtime)}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{selectedMovie.vote_average.toFixed(1)}/10</span>
                      </div>
                    </div>

                    {/* Genres */}
                    {selectedMovie.genres && selectedMovie.genres.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {selectedMovie.genres.map(genre => (
                          <span
                            key={genre.id}
                            className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                          >
                            {genre.name}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Overview */}
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Overview</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedMovie.overview || 'No overview available.'}
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2 pt-4">
                      {!watchedList.find(m => m.id === selectedMovie.id) && (
                        <Button
                          variant={watchList.find(m => m.id === selectedMovie.id) ? "secondary" : "default"}
                          onClick={() => {
                            const movie = selectedMovie as Movie;
                            watchList.find(m => m.id === movie.id) 
                              ? removeFromWatchList(movie.id)
                              : addToWatchList(movie);
                          }}
                        >
                          {watchList.find(m => m.id === selectedMovie.id) ? (
                            <>
                              <X className="w-4 h-4 mr-2" />
                              Remove from Watchlist
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 mr-2" />
                              Add to Watchlist
                            </>
                          )}
                        </Button>
                      )}
                      <Button
                        variant={watchedList.find(m => m.id === selectedMovie.id) ? "secondary" : "default"}
                        onClick={() => {
                          const movie = selectedMovie as Movie;
                          watchedList.find(m => m.id === movie.id)
                            ? removeFromWatchedList(movie.id)
                            : addToWatchedList(movie);
                        }}
                      >
                        {watchedList.find(m => m.id === selectedMovie.id) ? (
                          <>
                            <X className="w-4 h-4 mr-2" />
                            Remove from Watched
                          </>
                        ) : (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Mark as Watched
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Trailer */}
                    {movieVideos.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Trailer</h3>
                        <div className="aspect-video">
                          <iframe
                            src={`https://www.youtube.com/embed/${movieVideos[0].key}?autoplay=0&mute=0&controls=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
                            title={movieVideos[0].name}
                            className="w-full h-full rounded-lg"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Klik op de afspeelknop om de trailer met geluid af te spelen
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : null}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Index;
