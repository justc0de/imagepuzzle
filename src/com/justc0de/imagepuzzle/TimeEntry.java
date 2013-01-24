package com.justc0de.imagepuzzle;

import java.util.Date;

public class TimeEntry {
	
	private int gridSize;
	private String usersName;
	private Date usersTime;
	
	public TimeEntry(int gridSize, String usersName, Date usersTime){
		this.gridSize = gridSize;
		this.usersName = usersName;
		this.usersTime = usersTime;
	}
	
	protected int getGridSize(){
		return this.gridSize;
	}
	
	protected void setGridSize(int gridSize){
		this.gridSize = gridSize;
	}
	
	protected String getUsersName(){
		return this.usersName;
	}
	
	protected void setUsersName(String usersName){
		this.usersName = usersName;
	}
	
	protected Date getUsersTime(){
		return this.usersTime;
	}
	
	protected void setUsersTime(Date usersTime){
		this.usersTime = usersTime;
	}
}
