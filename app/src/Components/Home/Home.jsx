import UserMessages from './UserMessages';
import UserProfile from './UserProfile';

export default function Home() {

  return (
    <div >
    
    <div className="container py-5">
        <div className="row">
            <div  className="col-md-4">
                <UserProfile/>
            </div>
            <div className="col-md-8">
                <UserMessages/>
            </div>
        </div>
    </div>
    </div>
  )
}
