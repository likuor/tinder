import axios from "axios";
import React, { useState } from "react";

const Image = () => {
	const [file, setFile] = useState("");
	const [pic, setPic] = useState("");
	const submit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		console.log(file);
    formData.append("image", file);
    const userInfor = await {
			image: "image",
		};
		await axios
			.post("http://localhost:8000/image", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			})
			.then((res) => {
				console.log(res);
			});
	};
  const handleGet = (e) => {
		e.preventDefault();
    console.log("get");
		axios.get("http://localhost:8000/image").then((res) => {
      console.log("get",res);
      setPic(res.data)
		});
	};
	return (
		<>
			<form onSubmit={submit}>
				<input
					type='file'
					onChange={(e) => setFile(e.target.files[0])}
					accept='image/*'
				/>
				<button type='submit'>Submit</button>
			</form>
			<button onClick={handleGet}>
				Get
			</button>
      <img src={pic} alt={"profilePic"} style={{ "width": "300px", "height":"300px", "objectFit": "contain"}} />{" "}
		</>
	);
};

export default Image;
