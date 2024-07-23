import background from "../assets/bgHero.png";
import { IUser } from "../types.ts";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

interface ProfileFormProps {
  user: IUser | null;
  dismiss: () => void;
}

export function ProfileForm({ user, dismiss }: ProfileFormProps) {
  const [email, setEmail] = useState(user?.email || "");
  const [username, setName] = useState(user?.username || "");
  const [twitter, setTwitter] = useState(user?.twitter || "");
  const [facebook, setFacebook] = useState(user?.facebook || "");
  const [github, setGithub] = useState(user?.github || "");
  const [linkedin, setLinkedin] = useState(user?.linkedin || "");
  const [portfolio, setportfolio] = useState(user?.portfolio || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [error, setError] = useState({
    username: "",
    email: "",
    twitter: "",
    facebook:"",
    github:"",
    linkedin:"",
    portfolio:"",
    avatar: "",
    message: ""
  });

  const avatars = [
    "https://pics.craiyon.com/2023-07-28/4d23f41d2a314bf18241a5eb7cba44ad.webp",
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/27a5ebeb-b941-40ff-81ca-4bc839d75d27/dg2pjvt-de4e0619-5dd1-49ad-b1f2-285542ebcd95.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3YTVlYmViLWI5NDEtNDBmZi04MWNhLTRiYzgzOWQ3NWQyN1wvZGcycGp2dC1kZTRlMDYxOS01ZGQxLTQ5YWQtYjFmMi0yODU1NDJlYmNkOTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.aTdL1oScOa8eBHHWmeTJuTaf5KvRL6ofUTzgyh0VtBI",
    "https://pics.craiyon.com/2023-07-28/4d23f41d2a314bf18241a5eb7cba44ad.webp",
    "https://pics.craiyon.com/2023-07-28/4d23f41d2a314bf18241a5eb7cba44ad.webp",
    "https://pics.craiyon.com/2023-07-28/4d23f41d2a314bf18241a5eb7cba44ad.webp"
  ];

  async function updateUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const updatedUser = {
        email,
        username,
        twitter,
        facebook,
        github,
        linkedin,
        portfolio,
        avatar
      };
      if (!email) {
        toast.error("Email cannot be empty");
      }
      if (!username) {
        toast.error("Username cannot be empty");
      }
      const response = await axios.put(`/api/v1/user/update/${user?.id}`, updatedUser);
      toast.success(response.data.message);
      dismiss();
      window.location.reload();
    } catch (e: any) {
      const axiosError: AxiosError<{
        error: {
          message: string;
        };
      }> = e;

      const errorMessage = axiosError?.response?.data?.error?.message || "An unexpected error occurred";
      toast.error(errorMessage);
      setError((e : any)=> {
        if(axiosError?.response?.data?.error)
            e = axiosError?.response?.data?.error ;
        return e
    });
    }
  }

  return (
    <>
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-gray-300 pb-4 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="relative bg-white h-24 w-full">
                    <img className="h-24 w-full aspect-auto object-cover" src={background} alt="cover photo" />
                    <div className="absolute -bottom-10 left-10">
                      <img
                        className="inline-block h-20 w-20 ring-2 ring-white"
                        src={avatar || `https://ui-avatars.com/api/?name=${user?.username}&background=0ea5e9&color=fff&rounded=false&bold=true`}
                        alt="profile photo"
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:flex sm:items-start">
                  <div>
                    <h3 className="font-semibold mx-5 mt-16 text-gray-900">Personal Information</h3>
                    <form id="editProfile" onSubmit={updateUser}>
                      <div className="space-y-12">
                        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="sm:col-span-12 mx-5">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                              Username
                            </label>
                            <div className="mt-2">
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-500 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                  type="text"
                                  name="username"
                                  id="username"
                                  autoComplete="username"
                                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-500 focus:ring-0 sm:text-sm sm:leading-6 w-75"
                                  placeholder="janesmith"
                                  value={username}
                                  onChange={(e) => setName(e.target.value)}
                                />
                              </div>
                              <p className="text-sm font-semibold text-red-600">{error.username}</p>
                            </div>
                          </div>
                          <div className="sm:col-span-12 mx-5">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                              Email
                            </label>
                            <div className="mt-2">
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-500 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  type="email"
                                  name="email"
                                  id="email"
                                  autoComplete="email"
                                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-500 focus:ring-0 sm:text-sm sm:leading-6 w-75"
                                  placeholder="janesmith@gmail.com"
                                />
                              </div>
                              <p className="text-sm font-semibold text-red-600">{error.email}</p>
                            </div>
                          </div>
                          <div className="sm:col-span-12 mx-5">
                            <label htmlFor="twitter" className="block text-sm font-medium leading-6 text-gray-900">
                              Twitter
                            </label>
                            <div className="mt-2">
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-500 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                  value={twitter}
                                  onChange={(e) => setTwitter(e.target.value)}
                                  type="url"
                                  name="twitter"
                                  id="twitter"
                                  autoComplete="twitter"
                                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-500 focus:ring-0 sm:text-sm sm:leading-6 w-75"
                                  placeholder="https://twitter.com/yourprofile"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="sm:col-span-12 mx-5">
                            <label htmlFor="facebook" className="block text-sm font-medium leading-6 text-gray-900">
                              Facebook
                            </label>
                            <div className="mt-2">
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-500 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                  value={facebook}
                                  onChange={(e) => setFacebook(e.target.value)}
                                  type="url"
                                  name="facebook"
                                  id="facebook"
                                  autoComplete="facebook"
                                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-500 focus:ring-0 sm:text-sm sm:leading-6 w-75"
                                  placeholder="https://facebook.com/yourprofile"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="sm:col-span-12 mx-5">
                            <label htmlFor="github" className="block text-sm font-medium leading-6 text-gray-900">
                              Github
                            </label>
                            <div className="mt-2">
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-500 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                  value={github}
                                  onChange={(e) => setGithub(e.target.value)}
                                  type="url"
                                  name="github"
                                  id="github"
                                  autoComplete="github"
                                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-500 focus:ring-0 sm:text-sm sm:leading-6 w-75"
                                  placeholder="https://github.com/yourprofile"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="sm:col-span-12 mx-5">
                            <label htmlFor="linkedin" className="block text-sm font-medium leading-6 text-gray-900">
                              LinkedIn
                            </label>
                            <div className="mt-2">
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-500 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                  value={linkedin}
                                  onChange={(e) => setLinkedin(e.target.value)}
                                  type="url"
                                  name="linkedin"
                                  id="linkedin"
                                  autoComplete="linkedin"
                                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-500 focus:ring-0 sm:text-sm sm:leading-6 w-75"
                                  placeholder="https://linkedin.com/in/yourprofile"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="sm:col-span-12 mx-5">
                            <label htmlFor="portfolio" className="block text-sm font-medium leading-6 text-gray-900">
                                Portfolio
                            </label>
                            <div className="mt-2">
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-500 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                  value={portfolio}
                                  onChange={(e) => setportfolio(e.target.value)}
                                  type="url"
                                  name="portfolio"
                                  id="portfolio"
                                  autoComplete="portfolio"
                                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-500 focus:ring-0 sm:text-sm sm:leading-6 w-75"
                                  placeholder="https://portfolio.com/in/yourprofile"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="sm:col-span-12 mx-5">
                            <label htmlFor="avatar" className="block text-sm font-medium leading-6 text-gray-900">
                              Avatar
                            </label>
                            <div className="mt-2 grid grid-cols-5 gap-2">
                              {avatars.map((img) => (
                                <img
                                  key={img}
                                  src={img}
                                  alt="avatar"
                                  className={`h-16 w-16 cursor-pointer ${avatar === img ? 'ring-2 ring-indigo-600' : ''}`}
                                  onClick={() => setAvatar(img)}
                                />
                              ))}
                            </div>
                            <button
                              type="button"
                              className="mt-2 text-sm text-red-600 hover:underline"
                              onClick={() => setAvatar('')}
                            >
                              Reset to default avatar
                            </button>
                            <p className="text-sm font-semibold text-red-600">{error.avatar}</p>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button form="editProfile" type="submit" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">
                  Save
                </button>
                <button onClick={dismiss} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
