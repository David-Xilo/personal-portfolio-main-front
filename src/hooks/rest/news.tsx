//
// import { useState, useEffect } from 'react';
//
// interface ApiItem {
//   headline: string;
//   link_to_source: string;
//   description: string;
//   sentiment: string;
//   genre: string;
// }
//
// interface ApiResponse {
//   status: string;
//   message: ApiItem[];
//   error: string | null;
// }
//
// const useGetApi = (endpoint: string): ApiResponse => {
//   const completeEndpoint = domain + endpoint;
//   const [data, setData] = useState<ApiResponse>({
//     status: '',
//     message: [],
//     error: null,
//   });
//
//   useEffect(() => {
//     fetch(completeEndpoint)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((responseData) => {
//         const normalizedData: ApiResponse = {
//           status: "success",
//           message: Array.isArray(responseData.message) ? responseData.message : [],
//           error: null,
//         };
//         setData(normalizedData);
//       })
//       .catch(error => {
//         setData({
//           status: "error",
//           message: [],
//           error: error.message,
//         });
//       });
//   }, [completeEndpoint]);
//
//   return data;
// };
//
// export default useGetApi;
