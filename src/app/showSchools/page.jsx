"use client";

import { useEffect, useState } from "react";
import { Search, MapPin, Phone, Mail, Globe, ArrowLeft, ExternalLink } from "lucide-react";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/getSchools");
        const data = await response.json();
        setSchools(data);
        setFilteredSchools(data);
      } catch (error) {
        console.error("Error fetching schools:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchools();
  }, []);

  useEffect(() => {
    const filtered = schools.filter(school =>
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.state.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSchools(filtered);
  }, [searchTerm, schools]);

  const handleSchoolClick = (school) => {
    setSelectedSchool(school);
  };

  const handleBackToList = () => {
    setSelectedSchool(null);
  };

  if (selectedSchool) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <button
              onClick={handleBackToList}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-4"
            >
              <ArrowLeft size={20} />
              Back to Schools
            </button>
          </div>
        </div>

        {/* School Detail Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Hero Section */}
            <div className="relative h-80">
              <img
                src={selectedSchool.image || "/api/placeholder/800/320"}
                alt={selectedSchool.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h1 className="text-4xl font-bold mb-2">{selectedSchool.name}</h1>
                <div className="flex items-center gap-2 text-lg">
                  <MapPin size={20} />
                  <span>{selectedSchool.address}, {selectedSchool.city}, {selectedSchool.state}</span>
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="p-8 grid lg:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h2>

                <div className="space-y-4">
                  {selectedSchool.contact && (
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                      <Phone className="text-blue-600" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-semibold text-gray-800">{selectedSchool.contact}</p>
                      </div>
                    </div>
                  )}

                  {selectedSchool.email_id && (
                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                      <Mail className="text-green-600" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-semibold text-gray-800">{selectedSchool.email_id}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                    <MapPin className="text-purple-600" size={20} />
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="font-semibold text-gray-800">
                        {selectedSchool.address}<br />
                        {selectedSchool.city}, {selectedSchool.state}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* School Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">School Information</h2>

                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-2">{selectedSchool.name}</h3>
                  <p className="opacity-90">
                    Located in {selectedSchool.city}, {selectedSchool.state}, this institution is committed to providing quality education and fostering student growth.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl text-center">
                    <MapPin className="mx-auto text-blue-600 mb-2" size={24} />
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold">{selectedSchool.city}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl text-center">
                    <Globe className="mx-auto text-green-600 mb-2" size={24} />
                    <p className="text-sm text-gray-600">State</p>
                    <p className="font-semibold">{selectedSchool.state}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-8 pb-8">
              <div className="flex flex-wrap gap-4">
                {selectedSchool.contact && (
                  <a
                    href={`tel:${selectedSchool.contact}`}
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    <Phone size={18} />
                    Call School
                  </a>
                )}
                {selectedSchool.email_id && (
                  <a
                    href={`mailto:${selectedSchool.email_id}`}
                    className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors"
                  >
                    <Mail size={18} />
                    Send Email
                  </a>
                )}
                <a
                  href={`https://maps.google.com/search/${encodeURIComponent(selectedSchool.address + ' ' + selectedSchool.city + ' ' + selectedSchool.state)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors"
                >
                  <ExternalLink size={18} />
                  View on Map
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Discover Schools
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find the perfect educational institution for your needs
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search schools by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-colors bg-white shadow-lg"
              />
            </div>
            {searchTerm && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border p-3 z-10">
                <p className="text-sm text-gray-600">
                  {filteredSchools.length} school{filteredSchools.length !== 1 ? 's' : ''} found
                  {searchTerm && ` for "${searchTerm}"`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Schools Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredSchools.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏫</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              {searchTerm ? 'No schools found' : 'No schools available'}
            </h3>
            <p className="text-gray-500">
              {searchTerm ? `No schools match your search for "${searchTerm}"` : 'Schools will appear here once added to the database'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSchools.map((school) => (
              <div
                key={school.id}
                onClick={() => handleSchoolClick(school)}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2"
              >
                {/* School Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={school.image || "/api/placeholder/400/300"}
                    alt={school.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <ExternalLink size={16} className="text-gray-700" />
                  </div>
                </div>

                {/* School Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {school.name}
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-start gap-2 text-gray-600">
                      <MapPin size={16} className="mt-0.5 text-blue-500" />
                      <div className="text-sm">
                        <p>{school.address}</p>
                        <p>{school.city}, {school.state}</p>
                      </div>
                    </div>

                    {school.contact && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone size={16} className="text-green-500" />
                        <span className="text-sm">{school.contact}</span>
                      </div>
                    )}

                    {school.email_id && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail size={16} className="text-purple-500" />
                        <span className="text-sm">{school.email_id}</span>
                      </div>
                    )}
                  </div>

                  {/* View Details Button */}
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Click to view details</span>
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                        <ExternalLink size={14} className="text-blue-600 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
