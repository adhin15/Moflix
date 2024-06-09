import Link from "next/link";

const ExpMapping = (props) =>{
    const {header,data} = props
    return(
        <div>
            <h3 className="text-xl font-bold mb-4">{header}</h3>
              <div className="border rounded border-[#001d3d] box-shadow ">
                {data
                  ?.sort((a, b) => {
                    if ((a.release_date || a.first_air_date) === "" && (b.release_date || b.first_air_date) !== "") {
                      return -1; // Place empty values at the front
                    } else if (
                      (a.release_date || a.first_air_date) !== "" &&
                      (b.release_date || b.first_air_date) === ""
                    ) {
                      return 1; // Place empty values at the front
                    } else if (
                      (a.release_date || a.first_air_date) === "" &&
                      (b.release_date || b.first_air_date) === ""
                    ) {
                      return 0; // If both are empty, keep the order unchanged
                    } else {
                      return (b.release_date || b.first_air_date)?.localeCompare(a.release_date || b.first_air_date); // Compare non-empty dates in descending order
                    }
                  })
                  .map((val, index) => {
                    return (
                      <div
                        className={`flex gap-[8px] p-4 ${
                          (val?.release_date?.slice(0, 4) || val?.first_air_date?.slice(0, 4)) !==
                          data[index + 1]?.release_date?.slice(0, 4)
                            ? !data[index + 1]
                              ? "border-tranparent"
                              : "border-b border-b-[#fff]"
                            : ""
                        }`}
                        data-aos="fade-up"
                        data-aos-once={true}
                        key={index}
                      >
                        <div className="max-w-[100px] w-full flex items-center">
                          <div className="w-full text-center	">
                            {val?.release_date?.slice(0, 4) || val?.first_air_date?.slice(0, 4) || (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-dash-lg m-auto"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                        <div>
                          <Link href={`/${val?.media_type === "tv" ? "tv-series" : "movie"}/${val?.id}`}>
                            <p className="font-bold">{val.original_name || val.title}</p>
                          </Link>
                          <p className="pl-4">
                            <span className="opacity-50	">as </span>
                            {val.character}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
        </div>
    )
}

export default ExpMapping