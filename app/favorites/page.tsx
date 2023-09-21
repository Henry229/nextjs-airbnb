import getFavoriteListings from '../actions/getFavoriteListings';
import getCurrentUser from '../actions/getCurrentUser';
import EmptyState from '../components/EmptyState';
import FavoritesClient from './FavoritesClient';

export default async function FavoritePage() {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <EmptyState
        title='No favorites found'
        subtitle='Looks like you have no favorite listings.'
      />
    );
  }

  return <FavoritesClient listings={listings} currentUser={currentUser} />;
}
