import "../../sass/components/paginate.scss";
import { Link } from "react-router-dom";
import Panels from "./Panels";

interface postProp {
  pages: number;
  page: number;
  isAdmin: boolean;
}
export default function Paginate({ pages, page, isAdmin }: postProp) {
  console.log(pages);
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
                  to={
                    isAdmin
                      ? `/admin/productlist/page/${x + 1}`
                      : `/page/${x + 1}`
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
