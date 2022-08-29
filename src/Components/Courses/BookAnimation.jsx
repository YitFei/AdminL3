export default function BookAnimation(props) {
  return (
    <div
      class="component"
      style={
        {
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
        }
      }
    >
      <ul class="align" style={{ overflow: "auto" }}>
        <li>
          <figure class="book">
            <ul class="hardcover_front">
              <li>
                <div class={`coverDesign gradient${props.color}`}>
                  <h1>{props.courseName}</h1>
                </div>
              </li>
              <li></li>
            </ul>

            <ul class="page">
              <li></li>
              <li>
                <p class="btn">{props.desc} </p>
              </li>
              <li></li>
              <li></li>
              <li></li>
            </ul>

            <ul class="hardcover_back">
              <li></li>
              <li></li>
            </ul>
            <ul class="book_spine">
              <li></li>
              <li></li>
            </ul>
          </figure>
        </li>
      </ul>
    </div>
  );
}
