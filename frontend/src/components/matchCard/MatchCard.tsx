import { MatchOddsButtons } from '@components/matchCard/MatchOddsButtons';
import { MatchStakeInput } from '@components/matchCard/MatchStakeInput';
import { messages } from '@messages/messages';
import { useMatchBetting } from '@hooks/useMatchBetting';
import type { FC } from 'react';
import type { Odds } from '@typeDefs/game';

interface MatchCardProps {
  matchId: number;
  sport: string;
  date: string;
  homeTeam: string;
  awayTeam: string;
  odds: Odds;
}

export const MatchCard: FC<MatchCardProps> = ({
  matchId,
  sport,
  date,
  homeTeam,
  awayTeam,
  odds,
}) => {
  const {
    tempBetType,
    tempStake,
    isInSlip,
    locked,
    bettingOptions,
    handleSelectBet,
    handleStakeChange,
    handleAddBet,
    removeSelection,
  } = useMatchBetting({ matchId, sport, homeTeam, awayTeam, odds });

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 text-sm space-y-2 w-full lg:max-w-md border border-gray-200">
      <div className="text-gray-500 text-xs flex items-center justify-between gap-2">
        <span>{sport}</span>
        <span>{date}</span>
      </div>

      <div className="flex items-center justify-center gap-2">
        <div className="text-sm text-gray-800">{homeTeam}</div>
        <span className="text-sm font-semibold text-gray-900">{messages.common.vs}</span>
        <div className="text-sm text-gray-800">{awayTeam}</div>
      </div>

      <MatchOddsButtons
        options={bettingOptions}
        selected={tempBetType ?? undefined}
        onSelect={handleSelectBet}
      />

      <MatchStakeInput
        value={tempStake}
        onChange={handleStakeChange}
        min={1}
        max={1000}
        error={
          tempStake < 1 || tempStake > 1000 ? messages.errors.stake_must_be_between_1_and_1000 : ''
        }
      />

      <div className="flex items-center justify-between mt-4">
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            isInSlip && !locked
              ? 'bg-red-100 text-red-800 hover:bg-red-200'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          onClick={() => removeSelection(matchId)}
          disabled={!isInSlip || locked}
        >
          {messages.common.remove}
        </button>

        <button
          className="text-white bg-red-500 px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50"
          onClick={handleAddBet}
          disabled={!tempBetType || tempStake < 1 || tempStake > 1000 || isInSlip || locked}
        >
          {messages.common.add}
        </button>
      </div>
    </div>
  );
};
