import "../../sass/components/paginate.scss";
import { Link } from "react-router-dom";
import Panels from "./Panels";

interface postProp {
  pages: number;
  page: number;
  isAdmin: boolean;
  keyword?: string;
}
export default function Paginate({
  pages,
  page,
  isAdmin = false,
  keyword = "",
}: postProp) {
  // console.log(pages);
  return (
    pages > 1 && (
      <div className="pageDetails">
        <p>{`Page ${page} out of ${pages}`}</p>
        <Panels className="paginate">
          {[...Array(pages).keys()].map((x) => {
            return (
              <div key={x + 1} className="paginate__text">
                <Link
                  className={
                    // page = selected page
                    page === x + 1 ? "paginate__item active" : "paginate__item"
                  }
                  // prop "keyword" is added so that
                  // "search" will works with "paginate"
                  to={
                    !isAdmin
                      ? keyword
                        ? `/search/${keyword}/page/${x + 1}`
                        : `/page/${x + 1}`
                      : `/admin/productlist/page/${x + 1}`
                  }
                >
                  {x + 1}
                </Link>
              </div>
            );
          })}
        </Panels>
      </div>
    )
  );
}

//? Without search keyword
// to={
//   isAdmin
//     ? `/admin/productlist/page/${x + 1}`
//     : `/page/${x + 1}`
// }
