import React from "react";
import styles from "../Styles/select.module.css";

const FilterChips = ({
  dept,
  loc,
  fun,
  detpChange,
  locChange,
  funChange,
  clearAll,
}) => {
  return (
    <div className="flex justify-between w-[100%] p-5 m-auto bg-gray-200 mt-6">
      <div className="flex">
        <span className={styles.value}>
          {dept &&
            dept?.map((v) => (
              <span key={v.id} className={styles["option-badge"]}>
                {v.title}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    detpChange(dept.filter((o) => o.title !== v.title));
                  }}
                  className={styles["remove-btn"]}
                >
                  X
                </button>
              </span>
            ))}
        </span>
        <span className={styles.value}>
          {loc &&
            loc?.map((v) => (
              <span key={v.id} className={styles["option-badge"]}>
                {v.title}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    locChange(loc.filter((o) => o.title !== v.title));
                  }}
                  className={styles["remove-btn"]}
                >
                  X
                </button>
              </span>
            ))}
        </span>
        <span className={styles.value}>
          {fun &&
            fun?.map((v) => (
              <span key={v.id} className={styles["option-badge"]}>
                {v.title}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    funChange(fun.filter((o) => o.title !== v.title));
                  }}
                  className={styles["remove-btn"]}
                >
                  X
                </button>
              </span>
            ))}
        </span>
      </div>
      <div>
        <button onClick={clearAll} className="text-[#4b96e6]">
          Clear All
        </button>
      </div>
    </div>
  );
};

export default FilterChips;
