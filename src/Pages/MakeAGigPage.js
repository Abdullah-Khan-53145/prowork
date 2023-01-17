import React, { useState } from "react";
import { connect } from "react-redux";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { setAllGigsAPI } from "../actions";
import { storage, db } from "../firebase";
import "../Styles/MakeAGigPage.css";
function MakeAGigPage(props) {
  const [coverImage, setCoverImage] = useState(null);
  const [gigTitle, setGigTitle] = useState("");
  const [gigCategory, setGigCategory] = useState("");
  const [gigDescription, setGigDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([
    { title: "Basic", description: "", price: "", delivery_time: "" },
    { title: "Standard", description: "", price: "", delivery_time: "" },
    { title: "Gold", description: "", price: "", delivery_time: "" },
  ]);
  const reset = () => {
    setCoverImage(null);
    setGigTitle("");
    setGigCategory("");
    setGigDescription("");
    setPackages([
      { title: "Basic", description: "", price: "", delivery_time: "" },
      { title: "Standard", description: "", price: "", delivery_time: "" },
      { title: "Gold", description: "", price: "", delivery_time: "" },
    ]);
  };
  const handleCoverImageChange = (event) => {
    setCoverImage(event.target.files[0]);
  };

  const handleGigTitleChange = (event) => {
    setGigTitle(event.target.value);
  };

  const handleGigCategoryChange = (event) => {
    setGigCategory(event.target.value);
  };

  const handleGigDescriptionChange = (event) => {
    setGigDescription(event.target.value);
  };

  const handlePackageChange = (index, key, event) => {
    const updatedPackages = [...packages];
    updatedPackages[index][key] = event.target.value;
    setPackages(updatedPackages);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    // Form validation
    if (!coverImage) {
      alert("Please upload a cover image for your gig.");
      return;
    } else if (gigTitle.length > 100) {
      alert("Gig title must be less than 100 characters.");
      return;
    } else if (!gigCategory) {
      alert("Please select a category for your gig.");
      return;
    } else if (gigDescription.length < 500) {
      alert("Gig description must be at least 500 characters.");
      return;
    } else {
      const metadata = {
        contentType: "image/*",
      };

      const storageRef = ref(storage, "gig-imgs/" + coverImage.name);
      const uploadTask = uploadBytesResumable(storageRef, coverImage, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error.code);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);

            const docRef = await addDoc(collection(db, "gigs"), {
              uid: props.user.uid,
              username: props.user.email.split("@")[0],
              profile_pic: props.user.photoURL,
              gig_img: downloadURL,
              gig_title: gigTitle,
              gig_cat: gigCategory,
              gig_description: gigDescription,
              packages: packages,
              reviews: [],
              average_rating: 0.0,
              delivered_projects: 0,
            });
            console.log("Document written with ID: ", docRef.id);
            setLoading(false);
            props.setAllGigs();
            reset();
          });
        }
      );

      console.log("Submitting form data:", {
        uid: props.user.uid,
        username: props.user.email.split("@")[0],
        profile_pic: props.user.photoURL,
        gig_img: coverImage,
        gig_title: gigTitle,
        gig_cat: gigCategory,
        gig_description: gigDescription,
        packages: packages,
        reviews: [],
        average_rating: 0.0,
        delivered_projects: 0,
      });
    }
  };

  return (
    <div className="make__a__gig__parent">
      <div className="make__a__gig__illus">
        <img src="/imgs/make-a-gig-illus.svg" />
      </div>
      <form className="make_a_gig_form" onSubmit={handleSubmit}>
        <div className="make_a_gig_form_section">
          <label className="make_a_gig_form_label">Gig Cover Image</label>
          <input
            className="make_a_gig_form_input"
            type="file"
            accept="image/*"
            onChange={handleCoverImageChange}
            required
          />
          {coverImage && (
            <img
              src={URL.createObjectURL(coverImage)}
              alt="Gig Cover"
              className="make_a_gig_form_cover_image"
            />
          )}
        </div>
        <div className="make_a_gig_form_section">
          <label className="make_a_gig_form_label">Gig Title</label>
          <input
            className="make_a_gig_form_input"
            type="text"
            value={gigTitle}
            onChange={handleGigTitleChange}
            maxLength={100}
            required
          />
        </div>
        <div className="make_a_gig_form_section">
          <label className="make_a_gig_form_label">Gig Category</label>
          <div className="make_a_gig_form_input make_a_gig_form_input_cat">
            <div>
              <input
                type="radio"
                value="Web Development"
                checked={gigCategory === "Web Development"}
                onChange={handleGigCategoryChange}
                required
              />
              Web Development
            </div>
            <div>
              <input
                type="radio"
                value="Mobile Development"
                checked={gigCategory === "Mobile Development"}
                onChange={handleGigCategoryChange}
                required
              />
              Mobile Development
            </div>
            <div>
              <input
                type="radio"
                value="AI Development"
                checked={gigCategory === "AI Development"}
                onChange={handleGigCategoryChange}
                required
              />
              AI Development
            </div>
            <div>
              <input
                type="radio"
                value="Game Development"
                checked={gigCategory === "Game Development"}
                onChange={handleGigCategoryChange}
                required
              />
              Game Development
            </div>
          </div>
        </div>
        <div className="make_a_gig_form_section">
          <label className="make_a_gig_form_label">Gig Description</label>
          <textarea
            className="make_a_gig_form_input"
            value={gigDescription}
            rows="10"
            onChange={handleGigDescriptionChange}
            minLength={500}
            required
          />
        </div>
        <div className="make_a_gig_form_section">
          <label className="make_a_gig_form_label">Packages</label>
          <div className="make_a_gig_form_input make_a_gig_form_packages">
            {packages.map((pack, index) => (
              <div key={pack.title} className="packages_container">
                <h3>{pack.title}</h3>

                <div className="package_input_container">
                  <lable>Price</lable>
                  <input
                    type="text"
                    value={pack.price}
                    onChange={(event) =>
                      handlePackageChange(index, "price", event)
                    }
                  />
                </div>
                <div className="package_input_container">
                  <lable>Delivery Time</lable>
                  <input
                    type="text"
                    value={pack.delivery_time}
                    onChange={(event) =>
                      handlePackageChange(index, "delivery_time", event)
                    }
                  />
                </div>
                <div className="package_input_container">
                  <lable>Description</lable>
                  <textarea
                    type="text"
                    value={pack.description}
                    rows="5"
                    onChange={(event) =>
                      handlePackageChange(index, "description", event)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="make_a_gig_form_submit" type="submit">
          {loading ? (
            <>
              <div class="btn-loading-animation">
                <div class="btn-loading-bar"></div>
                <div class="btn-loading-bar"></div>
                <div class="btn-loading-bar"></div>
                <div class="btn-loading-bar"></div>
              </div>
            </>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.userState.user,
});

const mapDispatchToProps = (dispatch) => ({
  setAllGigs: () => dispatch(setAllGigsAPI()),
});
export default connect(mapStateToProps, mapDispatchToProps)(MakeAGigPage);
