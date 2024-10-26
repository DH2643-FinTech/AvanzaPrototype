// @/views/WatchlistView/WatchlistView.tsx
import { WatchlistTable} from "@/components/custom";
import { WatchListPresenterProps } from "./watchlistTypes";

const WatchlistView = (props: WatchListPresenterProps) => {
  const { status } = props;

  return (
    <div className="flex flex-col h-screen bg-white w-full">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-3xl font-bold mb-6">Watchlist</h1>
          {status === "loading" && <div>Loading...</div>}
          {status === "unauthenticated" && (
            <h2 className="text-2xl text-center pt-[200px] font-bold mb-4">
              Please log in to view your watchlist
            </h2>
          )}
          {status === "authenticated" && <WatchlistTable {...props.watchlistTableProps} />}
        </main>
      </div>
    </div>
  );
};
export default WatchlistView;
