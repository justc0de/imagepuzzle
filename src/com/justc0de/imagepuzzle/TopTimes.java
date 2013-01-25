package com.justc0de.imagepuzzle;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.List;

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
			
			compareUsersTime(
					response, 
					new TimeEntry(
							Integer.parseInt(request.getParameter("gridSize")),
							request.getParameter("usersName"),
							new Date(Long.parseLong(request.getParameter("usersTime")))));
		}
	}
	
	private void getTopTimes(HttpServletResponse response){
		
		try {
			//get latest times from storage then write back to requesting doc
			DataStorage connection = new GAEDataStoreOperations();
			List<TimeEntry> topTimes = connection.getTopTimes();
			
			// TODO results need to be formatted correctly
			String results = "";
			for (TimeEntry timeEntry: topTimes){
				results += "Grid size: " + timeEntry.getGridSize() +
	        			", Users name: " + timeEntry.getUsersName() +
	        			", Users time: " + timeEntry.getUsersTime().getTime() + "<br/>";
			}
			
			response.setContentType("text/html");
			PrintWriter out = response.getWriter();

			out.write(results);

		} catch (IOException io) {
			io.printStackTrace();
		}
	}
	
	private void compareUsersTime(HttpServletResponse response, TimeEntry timeEntry){
		
		DataStorage connection = new GAEDataStoreOperations();
		Date savedTime = connection.getTopTimeForGridSize(timeEntry.getGridSize());
		
		if (savedTime.getTime() > timeEntry.getUsersTime().getTime()){
			connection.setTopTimeForGridSize(timeEntry);
		}
		
		try {
			response.setContentType("text/html");
			PrintWriter out = response.getWriter();

			out.write("Saved to storage");

		} catch (IOException io) {
			io.printStackTrace();
		}
	}
}