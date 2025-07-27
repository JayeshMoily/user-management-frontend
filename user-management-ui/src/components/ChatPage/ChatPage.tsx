import React from "react";
import "./ChatPage.css";

const ChatPage: React.FC = () => {
  return (
    <div className="chatpage-container">
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card chatpage-chat-app">
            <div className="chatpage-chat">
              <div className="chatpage-chat-header clearfix">
                <div className="row">
                  <div className="col-lg-6">
                    <a data-toggle="modal" data-target="#view_info">
                      <img
                        src="https://w7.pngwing.com/pngs/821/381/png-transparent-computer-user-icon-peolpe-avatar-group.png"
                        alt="avatar"
                      />
                    </a>
                    <div className="chatpage-chat-about">
                      <h6 className="m-b-0">Public chat group</h6>
                      <small>Participants: 5</small>
                    </div>
                  </div>
                  <div className="col-lg-6 hidden-sm text-end chatpage-mt5">
                    <button className="btn btn-outline-secondary btn-sm">
                      <i className="fas fa-map-pin"></i>
                    </button>
                    <button className="btn btn-outline-secondary btn-sm">
                      <i className="fas fa-users"></i>
                    </button>
                    <button className="btn btn-outline-secondary btn-sm">
                      <i className="fas fa-expand"></i>
                    </button>
                    <button className="btn btn-outline-secondary btn-sm">
                      <i className="fas fa-circle-half-stroke"></i>
                    </button>
                    <button className="btn btn-outline-secondary btn-sm">
                      <i className="fa-solid fa-eye"></i>
                    </button>
                    <button className="btn btn-outline-secondary btn-sm">
                      <i className="fas fa-volume-high"></i>
                    </button>
                    <button className="btn btn-outline-secondary btn-sm">
                      <i className="fas fa-save"></i>
                    </button>
                    <button className="btn btn-outline-secondary btn-sm">
                      <i className="fas fa-trash"></i>
                    </button>
                    <button className="btn btn-outline-secondary btn-sm">
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="chatpage-chat-history">
                <ul className="m-b-0">
                  <li className="clearfix">
                    <div className="chatpage-message-data text-end">
                      <span className="chatpage-message-data-time">
                        10:10 AM, Today
                      </span>
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                        alt="avatar"
                      />
                    </div>
                    <div className="chatpage-message chatpage-other-message chatpage-float-right">
                      Hi Monica, how are you? How is the project coming along?
                      <div className="chatpage-about-buttons chatpage-mt5">
                        <button className="btn btn-outline-secondary btn-sm chatpage-mr5">
                          <i className="fas fa-trash"></i>
                        </button>
                        <button className="btn btn-outline-secondary btn-sm chatpage-mr5">
                          <i className="fas fa-paste"></i>
                        </button>
                        <button className="btn btn-outline-secondary btn-sm chatpage-mr5">
                          <i className="fas fa-volume-high"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                  <li className="clearfix">
                    <div className="chatpage-message-data">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar8.png"
                        alt="avatar"
                      />
                      <span className="chatpage-message-data-time">
                        10:12 AM, Today
                      </span>
                    </div>
                    <div className="chatpage-message chatpage-my-message">
                      Are we meeting today?
                      <div className="chatpage-about-buttons chatpage-mt5">
                        <button className="btn btn-outline-secondary btn-sm chatpage-mr5">
                          <i className="fas fa-trash"></i>
                        </button>
                        <button className="btn btn-outline-secondary btn-sm chatpage-mr5">
                          <i className="fas fa-paste"></i>
                        </button>
                        <button className="btn btn-outline-secondary btn-sm chatpage-mr5">
                          <i className="fas fa-volume-high"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                  <li className="clearfix">
                    <div className="chatpage-message-data">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar8.png"
                        alt="avatar"
                      />
                      <span className="chatpage-message-data-time">
                        10:15 AM, Today
                      </span>
                    </div>
                    <div className="chatpage-message chatpage-my-message">
                      Project has been already finished and I have results to
                      show you.
                      <div className="chatpage-about-buttons chatpage-mt5">
                        <button className="btn btn-outline-secondary btn-sm chatpage-mr5">
                          <i className="fas fa-trash"></i>
                        </button>
                        <button className="btn btn-outline-secondary btn-sm chatpage-mr5">
                          <i className="fas fa-paste"></i>
                        </button>
                        <button className="btn btn-outline-secondary btn-sm chatpage-mr5">
                          <i className="fas fa-volume-high"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="chatpage-chat-message clearfix">
                <div className="input-group mb-0">
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fas fa-message"></i>
                    </span>
                    <textarea
                      className="form-control"
                      placeholder="Enter text here..."
                      rows={1}
                    ></textarea>
                  </div>
                </div>
                <div className="chatpage-mt10">
                  <button className="btn btn-outline-secondary btn-sm">
                    <i className="fas fa-smile"></i>
                  </button>
                  <button className="btn btn-outline-secondary btn-sm">
                    <i className="fab fa-markdown"></i>
                  </button>
                  <button className="btn btn-outline-secondary btn-sm">
                    <i className="fas fa-paperclip"></i>
                  </button>
                  <button className="btn btn-outline-secondary btn-sm">
                    <i className="fas fa-microphone-slash"></i>
                  </button>
                  <button className="btn btn-outline-secondary btn-sm">
                    <i className="fas fa-paste"></i>
                  </button>
                  <button className="btn btn-outline-secondary btn-sm">
                    <i className="fas fa-trash"></i>
                  </button>
                  <button className="btn btn-outline-secondary btn-sm chatpage-float-right">
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
