import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';
import EmptyState from '../components/EmptyState';
import ReservationClient from './ReservationClient';

export default async function ReservationPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title='Unauthorized' subtitle='Please login' />;
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title='No reservations found'
        subtitle='You have not made any reservations yet'
      />
    );
  }

  return (
    <div>
      <ReservationClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </div>
  );
}
