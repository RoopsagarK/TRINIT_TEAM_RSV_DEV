import { useContext, useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import "../css/CreateTestPage.css";
import { Link } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import FormLabel from "@mui/material/FormLabel";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "../../api/axios";
import Button from "@mui/material/Button";
import Toast from "../components/Toast";
import { QuestionContext } from "../QuestionsContext";
import { AnswerContext } from "../AnwersContext";
import useAuth from "../hooks/useAuth";
import { DurationContext } from "../context/useDuration";

const OCR = "/upload";
const OCR1 = "/upload1";
const TESTDETAILS = "/testdetails";

const CreateTestPage = () => {
  const [nextSlide, setNextSilde] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [type, setType] = useState();
  const [Title, setTitle] = useState(null);
  const [PassPercent, setPassPercent] = useState(null);
  const [Duration, setDuration] = useState(null);
  const title = useRef();
  const paspercent = useRef();
  const [loading, setLoading] = useState(false);
  const duration = useRef();
  const navigate = useNavigate();
  const [testDetails, settestDetails] = useState({});
  const { user } = useAuth();
  const { setQuestions } = useContext(QuestionContext);
  const { setAnswers } = useContext(AnswerContext);
  const { durations, setDurations, percent, setPrecent, numberQ, setnumberQ } =
    useContext(DurationContext);
  const [file1, setFile1] = useState();
  const [file2, setFile2] = useState();

  const onNext = async (ev) => {
    ev.preventDefault();
    console.log(
      user.username,
      title.current.value,
      paspercent.current.value,
      duration.current.value,
      type
    );

    if (
      title.current.value !== undefined &&
      paspercent.current.value !== undefined &&
      duration.current.value !== undefined &&
      type !== undefined
    ) {
      const response = await axios.post(TESTDETAILS, {
        user_id: user.user_id,
        title: title.current.value,
        pass_percentage: paspercent.current.value,
        duration: duration.current.value,
        type: type,
      });
      setDurations(duration.current.value);
      setPrecent(paspercent.current.value);
      console.log(response?.data?.data[0]);
      settestDetails(response?.data?.data[0]);
      setNextSilde(false);
    } else setNextSilde(true);
  };

  const onBack = () => {
    setNextSilde(true);
  };

  if (showToast) {
    setTimeout(() => {
      <Toast>File Uploaded Successfully</Toast>;
    }, 3000);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-purple-200">
        <CircularProgress color="secondary" size={80} />
      </div>
    );
  }

  const QuestionHandler = (ev) => {
    setFile1(ev.target.files[0]);
    setTimeout(() => {
      setShowToast(true);
    }, 3000);
    setShowToast(false);
  };

  const AnswerHandler = (ev) => {
    setFile2(ev.target.files[0]);
  };

  console.log(file1, file2);

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleSubmit = () => {
    console.log({ Title, PassPercent, Duration });
  };

  const UploadHandler = async (ev) => {
    ev.preventDefault();
    navigate("/assessment");
    const formData = new FormData();
    formData.append("pdfFile", file1);

    const formData1 = new FormData();
    formData1.append("pdfFile1", file2);

    console.log(formData);
    console.log(formData1);

    setLoading(true);
    try {
      const response = await axios.post(OCR, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const response1 = await axios.post(OCR1, formData1, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setQuestions(response?.data?.data);
      setAnswers(response1?.data?.data);

      setLoading(false);

      handleSubmit();
      console.log(response?.data?.data);
      console.log(responses?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center w-full bg-purple-200 min-h-[87vh]">
      {nextSlide ? (
        <div className="flex flex-col justify-center w-10/12">
          <div className="flex-col">
            <Typography
              sx={{
                m: 2,
                fontWeight: "bold",
                color: "#521656ff",
                textShadow: "2px 2px #ffff",
              }}
              variant="h4"
              component="h2"
              gutterBottom
            >
              Welcome to the Test Creation Page
            </Typography>
          </div>

          <div className="overflow-hidden">
            <form>
              <Typography
                sx={{ m: 2 }}
                variant="h5"
                component="h2"
                gutterBottom
              >
                Please enter the title for the test:
              </Typography>
              <TextField
                sx={{ margin: "0px 30px", width: "100%" }}
                id="outlined-basic"
                color="secondary"
                label="Test Title"
                value={Title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                variant="filled"
                required
                inputRef={title}
              />

              <Typography
                sx={{ m: 2 }}
                variant="h5"
                component="h2"
                gutterBottom
              >
                Enter the passing percentage of the test:
              </Typography>
              <TextField
                sx={{ margin: "0px 30px", width: "100%" }}
                id="outlined-basic"
                color="secondary"
                value={PassPercent}
                label="Pass Percentage"
                type="number"
                fullWidth
                variant="filled"
                required
                onChange={(e) => setPassPercent(e.target.value)}
                inputRef={paspercent}
              />

              <Typography
                sx={{ m: 2 }}
                variant="h5"
                component="h2"
                gutterBottom
              >
                Enter the duration of the test:
              </Typography>

              <TextField
                sx={{ margin: "0px 30px", width: "100%" }}
                id="outlined-basic"
                color="secondary"
                label="Duration"
                value={Duration}
                type="number"
                onCanPlay={(e) => setDuration(e.target.value)}
                fullWidth
                variant="filled"
                required
                inputRef={duration}
              />
              <div className="grid grid-cols-2">
                <FormControl sx={{ m: 2 }} color="secondary">
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Keep your test public/private
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    color="secondary"
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="public"
                      control={<Radio />}
                      label="Public"
                    />
                    <FormControlLabel
                      value="private"
                      control={<Radio />}
                      label="Private"
                    />
                  </RadioGroup>
                </FormControl>
                <Button
                  className="gradient"
                  sx={{
                    color: "white",
                    width: "400px",
                    height: "50px",
                    margin: "25px 0px",
                    display: "flex",
                    gap: "20px",
                  }}
                  variant="filled"
                  type="submit"
                  onClick={onNext}
                >
                  Next <ArrowCircleRightIcon />
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <form action="">
            <div className="grid grid-cols-2">
              <div className="h-40 form-group file-area">
                <label
                  htmlFor="images"
                  className="h-full text-xl font-semibold text-purple-900"
                >
                  Question PDF/Images
                </label>
                <input
                  // ref={media}
                  type="file"
                  name="images"
                  id="images"
                  onChange={QuestionHandler}
                  required="required"
                />
                <div className="file-dummy">
                  <div className="success">
                    Great, your files are selected. Keep on.
                  </div>
                  <div className="default">
                    Please select a Question PDF/Images
                  </div>
                </div>
              </div>

              <div className="h-40 form-group file-area">
                <label
                  htmlFor="images"
                  className="h-full text-xl font-semibold text-purple-950"
                >
                  Answer PDF/Images{" "}
                </label>
                <input
                  // ref={media}
                  type="file"
                  name="images"
                  id="images"
                  onChange={AnswerHandler}
                  required="required"
                />
                <div className="file-dummy">
                  <div className="success">
                    Great, your files are selected. Keep on.
                  </div>
                  <div className="default">
                    Please select a Answer PDF/Images
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <Button
                onClick={UploadHandler}
                className="gradient"
                sx={{ color: "white", px: 4 }}
              >
                Create
              </Button>
              <h1 className="mt-5 mb-5">OR</h1>
              <Link to={"/custom"}>
                <Button
                  color="secondary"
                  className="pt-3 pb-3 pl-5 pr-5 border-2 rounded-lg"
                >
                  Create A Custom Test
                </Button>
              </Link>
            </div>
            <div className="flex flex-row items-center justify-end w-full">
              <Button
                className="gradient"
                variant="filled"
                sx={{ color: "white", display: "flex", gap: "10px" }}
                onClick={onBack}
              >
                <ArrowCircleLeftIcon />
                Back
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateTestPage;
