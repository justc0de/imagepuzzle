package com.justc0de.imagepuzzle;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.Vector;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@SuppressWarnings("serial")
public class TopTimes extends HttpServlet {
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		if (request.getParameter("operation").compareTo("getTopTimes") == 0){
			
			getTopTimes(response);
			
		}else if(request.getParameter("operation").compareTo("compareUsersTime") == 0){
			
			compareUsersTime(response, 
					Integer.parseInt(request.getParameter("gridSize")),
					request.getParameter("usersName"),
					new Date(Long.parseLong(request.getParameter("usersTime"))));
		}
	}
	
	private void getTopTimes(HttpServletResponse response){
		try {
			
			/*
			 * get latest times from storage then write back to requesting doc
			 * 
			 * DataStorage connection = new GAEDataStoreOperations();
			 * Vector<TimeEntry> topTimes = connection.getTopTimes();
			 */
			
			response.setContentType("text/html");
			PrintWriter out = response.getWriter();

			out.write("Results");

		} catch (IOException io) {
			io.printStackTrace();
		}
	}
	
	private void compareUsersTime(HttpServletResponse response, int gridSize, String usersName, Date usersTime){
		
		TimeEntry timeEntry = new TimeEntry(gridSize, usersName, usersTime);
		
		try {
			response.setContentType("text/html");
			PrintWriter out = response.getWriter();
			
			/*
			 * check if users time was quicker then time stored , if so, update stored data
			 * 
			 * DataStorage connection = new GAEDataStoreOperations();
			 * 
			 * if (connection.getTopTimeForGridSize(timeEntry.getGridSize()).getTime() < 
			 *     timeEntry.getUsersTime().getTime()){
			 *         connection.setTopTimeForGridSize(timeEntry);
			 * }
			 */

			out.write("Data in servlet");

		} catch (IOException io) {
			io.printStackTrace();
		}
	}
}