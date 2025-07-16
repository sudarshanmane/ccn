// frontend/src/components/CandidateTable.jsx
import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import { CardFooter } from "@/components/ui/card"; // Import CardFooter for consistent styling
import { LucideLoader2 } from "lucide-react";

const CandidateTable = ({
  loading,
  candidates = [],
  formatTimestamp,
  handlePageChange,
  totalPages = 2,
  currentPage = 1,
}) => {
  return (
    <div className="flex flex-col ">
      {!loading && candidates.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No candidates added yet. Add one to get started!
        </p>
      ) : (
        <>
          <div className="rounded-md border">
            <div className="rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <Table className="w-full text-sm text-gray-800">
                {/* Table Header with background color */}
                <TableHeader className="bg-gray-100">
                  <TableRow>
                    <TableHead className="border-b font-semibold text-gray-700">
                      Name
                    </TableHead>
                    <TableHead className="border-b font-semibold text-gray-700">
                      Email
                    </TableHead>
                    <TableHead className="border-b font-semibold text-gray-700">
                      Last Updated
                    </TableHead>
                    <TableHead className="text-right border-b font-semibold text-gray-700">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>

                {!loading && (
                  <TableBody>
                    {candidates.map((candidate, index) => (
                      <TableRow
                        key={candidate._id}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } hover:bg-blue-50 transition-colors`}
                      >
                        <TableCell className="border-b px-4 py-3 font-medium">
                          {candidate.name}
                        </TableCell>
                        <TableCell className="border-b px-4 py-3">
                          {candidate.email}
                        </TableCell>
                        <TableCell className="border-b px-4 py-3">
                          {formatTimestamp(candidate.updatedAt)}
                        </TableCell>
                        <TableCell className="text-right border-b px-4 py-3">
                          <Link to={`/candidate/${candidate._id}`}>
                            <Button variant="outline" size="sm">
                              View Notes
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </div>

            {loading && (
              <div className="w-full flex justify-center items-center p-4 border">
                <LucideLoader2 className="animate-spin "></LucideLoader2>
              </div>
            )}
          </div>
          <div className="flex justify-end">
            {totalPages > 1 && (
              <CardFooter className="flex justify-end p-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          onClick={() => handlePageChange(index + 1)}
                          isActive={currentPage === index + 1}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardFooter>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CandidateTable;
