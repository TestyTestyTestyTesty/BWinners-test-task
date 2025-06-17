import './App.css';
import { useEffect, useState } from 'react';
import { Cart } from '@/components/cart/Cart';
import { DateFilter } from '@components/DateFilter';
import { MatchCard } from '@/components/matchCard/MatchCard';
import { SportsList } from '@components/SportsList';
import { Layout } from '@components/Layout';
import { useFilteredGames } from '@hooks/useFilteredGames';
import { useInitializeSport } from '@hooks/useInitializeSport';
import { useLoadGames } from '@hooks/useLoadGames';
import { messages } from '@messages/messages';
import { MobileCartDrawer } from '@components/MobileCartDrawer';
import { useCartLogic } from '@hooks/useCartLogic';

const App = () => {
  const { games, loading, error } = useLoadGames();
  const cartLogic = useCartLogic();

  const [isMobileCartOpen, setMobileCartOpen] = useState(false);

  useInitializeSport(games);
  const filteredGames = useFilteredGames(games);

  const renderContent = () => {
    if (loading) return <p>{messages.common.loading_games}</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (filteredGames.length === 0) {
      return <p className="text-gray-500">{messages.common.no_matches_found}</p>;
    }

    return filteredGames.map((game) => (
      <MatchCard
        key={game.id}
        matchId={game.id}
        date={new Date(game.commence_time).toLocaleDateString()}
        sport={game.sport}
        homeTeam={game.home_team}
        awayTeam={game.away_team}
        odds={{
          home: game.odds.home,
          draw: game.odds.draw,
          away: game.odds.away,
        }}
      />
    ));
  };

  useEffect(() => {
    if (isMobileCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileCartOpen]);

  return (
    <Layout
      sidebar={<SportsList listName={messages.common.sports} />}
      aside={
        <div className="hidden lg:block pl-4 w-full lg:max-w-[300px]">
          <Cart {...cartLogic} />
        </div>
      }
    >
      <div className="py-4 gap-4 flex flex-col items-center w-full">
        <div className="flex flex-col items-center gap-2 text-black bg-white shadow-sm rounded-lg p-4 text-sm space-y-2 w-full lg:max-w-md border border-gray-200">
          <h2 className="font-bold">Tomasz Sikora BWinners test task</h2>
          <p>Please read Readme.md to understand full context</p>
        </div>

        <DateFilter />
        {renderContent()}
      </div>

      <MobileCartDrawer
        isOpen={isMobileCartOpen}
        onClose={() => setMobileCartOpen((prev) => !prev)}
      >
        <Cart {...cartLogic} />
      </MobileCartDrawer>
    </Layout>
  );
};

export default App;
