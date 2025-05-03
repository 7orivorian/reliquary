import './app.scss';
import {Route, Routes} from "react-router-dom";
import Home from "./home/Home";
import Navbar from "../components/Navbar/Navbar";
import {FileProvider} from "../context/FileContext";
import {PreferenceProvider} from "../context/PreferenceContext";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ArtworkProvider} from "../context/ArtworkContext";
import Search from "./search/Search";
import {TagProvider} from "../context/TagContext";
import ArtworkDetails from "./artworks/artwork-details/ArtworkDetails";
import ArtistDetails from "./artists/artist-details/ArtistDetails";
import Artworks from "./artworks/Artworks";
import Artists from "./artists/Artists";
import ArtistSearch from "./search/ArtistSearch";
import ArtworkSearch from "./search/ArtworkSearch";
import AddArtwork from "./save/AddArtwork";
import {ArtistProvider} from "../context/ArtistContext";

const queryClient = new QueryClient();

export default function App() {
    return (
            <>
                <QueryClientProvider client={queryClient}>
                    <PreferenceProvider>
                        <div className="main">
                            <ArtworkProvider>
                                <ArtistProvider>
                                    <TagProvider>
                                        <FileProvider>
                                            <Navbar/>
                                            <div className="page-router__content">
                                                <Routes>
                                                    <Route path="/" element={<Home/>}/>
                                                    <Route path="/add" element={<AddArtwork/>}/>
                                                    <Route path="/search" element={<Search/>}>
                                                        <Route path="artworks" element={<ArtworkSearch/>}/>
                                                        <Route path="artists" element={<ArtistSearch/>}/>
                                                    </Route>
                                                    <Route path="/artworks" element={<Artworks/>}/>
                                                    <Route path="/artworks/:artworkId" element={<ArtworkDetails/>}/>
                                                    <Route path="/artists" element={<Artists/>}/>
                                                    <Route path="/artists/:artistId" element={<ArtistDetails/>}/>
                                                </Routes>
                                            </div>
                                        </FileProvider>
                                    </TagProvider>
                                </ArtistProvider>
                            </ArtworkProvider>
                        </div>
                        <div id="modal-root"></div>
                    </PreferenceProvider>
                </QueryClientProvider>
            </>
    );
}
