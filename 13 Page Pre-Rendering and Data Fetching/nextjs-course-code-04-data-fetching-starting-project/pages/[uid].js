function UserIdPage(props) {
   return <h1>{props.id}</h1>; //  Display the user ID
}

export async function getServerSideProps(context) {
   const { params } = context; //  Extract dynamic route parameters
   const userId = params.uid; //  Extract 'uid' from the URL

   return {
      props: {
         id: 'userid-' + userId, //  Send as prop to component
      },
   };
}

export default UserIdPage;
