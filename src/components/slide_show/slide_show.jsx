import '../slide_show/slide_show.css'; // Make sure to create a CSS file with the contentss from your styles

const SlideShow = () => {
  const images = [
    'https://cdn.mos.cms.futurecdn.net/dP3N4qnEZ4tCTCLq59iysd.jpg',
    'https://i.redd.it/tc0aqpv92pn21.jpg',
    'https://wharferj.files.wordpress.com/2015/11/bio_north.jpg',
    'https://images7.alphacoders.com/878/878663.jpg',
    'https://theawesomer.com/photos/2017/07/simon_stalenhag_the_electric_state_6.jpg',
    'https://da.se/app/uploads/2015/09/simon-december1994.jpg',
  ];

  const titles = [
    'Lossless Youths',
    'Estrange Bond',
    'The Gate Keeper',
    'Last Trace Of Us',
    'Urban Decay',
    'The Migration',
  ];

  const descriptions = new Array(6).fill(
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
  );

  // Handler for the next button
  const handleNext = () => {
    // Get the first element and append it to the end of the list
    const firstItem = document.querySelector('.slider .itemss:first-child');
    if (firstItem) {
      firstItem.parentElement.appendChild(firstItem);
    }
  };

  return (
    <main>
      <ul className="slider">
        {images.map((imgSrc, index) => (
          <li
            key={index}
            className="itemss"
            style={{ backgroundImage: `url(${imgSrc})` }}
            onClick={handleNext}
          >
            <div className="contentss">
              <h2 className="titless">{titles[index]}</h2>
              <p className="descriptionss">{descriptions[index]}</p>
              <button>Read More</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default SlideShow;
