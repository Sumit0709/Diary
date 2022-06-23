const UNSPLASH_DOMAIN = "https://api.unsplash.com";
const ACCESS_KEY = "AbEFa7JtLw7XjgOAJoAVZh_v-kP4DByJ1GS58Q6cbMk";
const myConstraint = "per_page=30";

export const unsplashApi = async (props) => {
  let url = `${UNSPLASH_DOMAIN}/photos/?${myConstraint}&client_id=${ACCESS_KEY}`;

  const search = props.search;
  if (search) {
    url = `${UNSPLASH_DOMAIN}/search/photos?${myConstraint}&query=${search}&client_id=${ACCESS_KEY}`;
  }

  const urlList = [];

  const fetchData = async () => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error in fetching Data");
    }

    let responseData = await response.json();
    if(search){
        responseData = responseData.results;
    }

    for (const data in responseData) {
        const urlObject = responseData[data];
      urlList.push({
        id: urlObject.id,
        urlThumb: urlObject.urls.regular,
        urlRegular: urlObject.urls.regular,
      });
      
    }
    
  };

  await fetchData().catch((error) => {
    console.log(error);
  });

  return urlList;
};
